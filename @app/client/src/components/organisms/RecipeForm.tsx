import { CreateRecipeQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'
import {
  CreateIngredientQuery,
  CreateRecipeIngredientQuery,
  CreateRecipeQuery,
  UpdateRecipeQuery
} from '@dishcover/shared/types/requests'
import {
  IngredientDtoType,
  RecipeDtoType,
  RecipeIngredientDtoType
} from '@dishcover/shared/types/resources'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Dialog, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import UserContext from '../../contexts/UserContext'
import * as apiService from '../../services/apiService'
import FormTextField from '../atoms/form/FormTextField'
import RecipeFormTitle from '../atoms/form/RecipeFormTitle'
import SubmitButton from '../atoms/form/SubmitButton'
import IngredientAutoComplete from '../molecules/IngredientAutocomplete'
import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'

interface AuthenticationFormProps {
  recipe?: CreateRecipeQuery | RecipeDtoType | null
  onSubmit: (submittedRecipe: RecipeDtoType) => void
}

export default function RecipeForm({ onSubmit: postSubmit, recipe }: AuthenticationFormProps) {
  const context = useContext(UserContext)
  const {
    register,
    handleSubmit: manageSubmit,
    setValue,
    watch,
    trigger,
    setError,
    getValues,
    formState: { errors }
  } = useForm<CreateRecipeQuery>({
    resolver: zodResolver(CreateRecipeQuerySchema),
    defaultValues: recipe || { recipeIngredients: [] },
    mode: 'onChange'
  })
  const [ingredientFormOpen, toggleIngredientFormOpen] = useState(false)
  const [newIngredient, setNewIngredient] = useState<Partial<CreateIngredientQuery>>()

  const openIngredientForm = (defaultValues: Partial<CreateIngredientQuery>) => {
    setNewIngredient(defaultValues)
    toggleIngredientFormOpen(true)
  }

  const closeIngredientForm = () => {
    toggleIngredientFormOpen(false)
  }
  const checkServerErrors = async function (data: CreateRecipeQuery | UpdateRecipeQuery) {
    const token = context.getConnectedUser()?.token
    const authorId = context.getConnectedUser()?.id
    if (token && authorId) {
      const response = !data.id
        ? await apiService.createRecipe(data, token)
        : await apiService.updateRecipe(data, token)
      if (!response?.error && response?.data) {
        postSubmit(response?.data)
      }
      const error = response?.error
      if (error && error.details) {
        if (Array.isArray(error.details)) {
          for (const detail of error.details) {
            if (detail.fields) {
              for (const field of detail.fields) {
                setError(field as keyof CreateRecipeQuery, {
                  message: detail.message || error.message
                })
              }
            }
          }
          return
        }
      }
    }
  }
  function addNewRecipeIngredient(ingredient: IngredientDtoType) {
    const recipeIngredient: CreateRecipeIngredientQuery = {
      ingredientId: ingredient.id as string,
      quantity: 1,
      details: ingredient
    }
    const recipeIngredients = incrementIngredientQuantity(recipeIngredient)
    setValue('recipeIngredients', recipeIngredients)
    closeIngredientForm()
  }

  function decrementIngredientQuantity(
    recipeIngredient: CreateRecipeIngredientQuery | RecipeIngredientDtoType
  ) {
    const currentRecipe = getValues()
    const recipeIngredients = currentRecipe.recipeIngredients || []
    const existingIngredientIndex = recipeIngredients.findIndex(
      (i) => i.ingredientId === recipeIngredient.ingredientId
    )
    if (existingIngredientIndex !== -1) {
      recipeIngredients[existingIngredientIndex].quantity -= 1
      if (recipeIngredients[existingIngredientIndex].quantity === 0) {
        recipeIngredients.splice(existingIngredientIndex, 1)
      }
    }

    setValue('recipeIngredients', recipeIngredients)
    trigger('recipeIngredients')
    return recipeIngredients
  }

  function incrementIngredientQuantity(
    recipeIngredient: RecipeIngredientDtoType | CreateRecipeIngredientQuery
  ) {
    const currentRecipe = getValues()
    const recipeIngredients: (RecipeIngredientDtoType | CreateRecipeIngredientQuery)[] =
      currentRecipe.recipeIngredients || []
    const existingIngredientIndex = recipeIngredients.findIndex(
      (i) => i.ingredientId === recipeIngredient.ingredientId
    )
    if (existingIngredientIndex !== -1) {
      recipeIngredients[existingIngredientIndex].quantity += 1
    } else {
      recipeIngredients.push(recipeIngredient)
    }
    setValue('recipeIngredients', recipeIngredients)
    trigger('recipeIngredients')
    return recipeIngredients
  }

  return (
    <>
      <form onSubmit={manageSubmit(checkServerErrors)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, rowGap: 2 }}>
          <RecipeFormTitle>{!recipe ? 'create' : 'edit'} a recipe</RecipeFormTitle>
          <TextField
            sx={{ display: 'none' }}
            value={recipe?.authorId || context.getConnectedUser()?.id}
            InputProps={{ ...register('authorId') }}
          />
          <FormTextField
            error={!!errors.label}
            helperText={errors.label?.message}
            InputProps={{ ...register('label') }}
            label="Label"
            id="label"
          />
          <FormTextField
            error={!!errors.image}
            helperText={errors.image?.message}
            InputProps={{ ...register('image') }}
            label="Image"
            id="image"
            type="url"
          />
          <IngredientList
            listItemProps={{
              decrease: decrementIngredientQuantity,
              increase: incrementIngredientQuantity,
              canEdit: true
            }}
            recipeIngredients={watch('recipeIngredients')}></IngredientList>
          <IngredientAutoComplete
            error={!!errors.recipeIngredients}
            helperText={errors.recipeIngredients?.message}
            onAddIngredient={addNewRecipeIngredient}
            openFormDialog={openIngredientForm}
          />
          <FormTextField
            error={!!errors.description}
            helperText={errors.description?.message}
            InputProps={{ ...register('description') }}
            multiline
            minRows={3}
            label="Description"
            id="description"
          />
          <SubmitButton>submit</SubmitButton>
        </Box>
      </form>
      <Dialog open={ingredientFormOpen} onClose={closeIngredientForm}>
        <IngredientForm postSubmit={addNewRecipeIngredient} ingredient={newIngredient} />
      </Dialog>
    </>
  )
}
