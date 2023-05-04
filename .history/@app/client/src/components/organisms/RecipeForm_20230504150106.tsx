import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useContext } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import RecipeFormTitle from '../atoms/form/RecipeFormTitle'

import UserContext from '../../contexts/UserContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchemaType, SignUpFormSchema } from '../../models/form/SignupForm'
import * as apiService from '../../services/apiService'
import { CreateRecipeQuery, CreateRecipeSchema, RecipeDtoType } from '@dishcover/shared'
import IngredientList from './IngredientList'

interface AuthenticationFormProps {
  onSubmit: (recipe: RecipeDtoType) => void
  create: boolean
}

export default function RecipeForm({ onSubmit: postSubmit, create }: AuthenticationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CreateRecipeQuery>({
    resolver: zodResolver(CreateRecipeSchema)
  })
  const context = useContext(UserContext)

  const onSubmit: SubmitHandler<CreateRecipeQuery> = async (recipeInfos) => {
    const response = create
      ? await apiService.createRecipe({
          ...recipeInfos,
          authorId: context.connectedUser?.id
        })
      : await apiService.updateRecipe({
          ...recipeInfos,
          authorId: context.connectedUser?.id
        })
    if (!response?.error && response?.data) {
      postSubmit(response?.data)
    }
  }
  watch()
  return (
    <form>
      <RecipeFormTitle>{create ? 'create' : 'edit'} a recipe</RecipeFormTitle>
      <FormTextField
        error={!!errors.label}
        helperText={errors.label?.message}
        {...register('label')}
        label="Label"
        id="label"></FormTextField>
      <FormTextField
        {...register('image')}
        error={!!errors.image}
        helperText={errors.image?.message}
        label="Image"
        id="image"
        type="image"></FormTextField>
      <IngredientList recipeIngredients={watch().ingredients}></IngredientList>
      <FormTextField
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        label="Description"
        id="description"></FormTextField>
      <SubmitButton onSubmit={handleSubmit(onSubmit)}>submit</SubmitButton>
    </form>
  )
}
