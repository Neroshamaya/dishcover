import { CreateIngredientSchema } from '@dishcover/shared/schemas/requests/Ingredient'
import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { IngredientDtoType } from '@dishcover/shared/types/resources'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField } from '@mui/material'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import UserContext from '../../contexts/UserContext'
import * as apiService from '../../services/apiService'
import { addIngredient } from '../../store'
import FormTextField from '../atoms/form/FormTextField'
import SubmitButton from '../atoms/form/SubmitButton'
import IngredientFormTitle from '../atoms/ingredient/IngredientFormTitle'

interface IngredientFormProps {
  postSubmit: (ingredient: IngredientDtoType) => void
  ingredient?: Partial<CreateIngredientQuery> | null
}

export default function IngredientForm({ postSubmit, ingredient }: IngredientFormProps) {
  const {
    register,
    handleSubmit: handleSubmitIngredient,
    setError,
    formState: { errors }
  } = useForm<CreateIngredientQuery>({
    resolver: zodResolver(CreateIngredientSchema),
    defaultValues: {
      label: ingredient?.label
    },
    mode: 'onChange'
  })
  const context = useContext(UserContext)

  const onSubmit: SubmitHandler<CreateIngredientQuery> = async (ingredientInfos) => {
    const token = context.getConnectedUser()?.token
    const authorId = context.getConnectedUser()?.id
    if (token && authorId) {
      const response = !ingredient?.id
        ? await apiService.createIngredient(ingredientInfos, token)
        : await apiService.updateIngredient(ingredientInfos, token)
      if (!response?.error && response?.data) {
        addIngredient(response?.data)
        postSubmit(response?.data)
      }
      const error = response?.error
      if (error && error.details && Array.isArray(error.details)) {
        for (const detail of error.details) {
          for (const field of detail.fields) {
            setError(field as keyof CreateIngredientQuery, {
              message: detail.message || error.message
            })
          }
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmitIngredient(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, rowGap: 2 }}>
        <TextField
          sx={{ display: 'none' }}
          value={context.getConnectedUser()?.id}
          InputProps={{ ...register('authorId') }}
        />
        <IngredientFormTitle>
          {!ingredient?.id ? 'create' : 'edit'} an ingredient
        </IngredientFormTitle>
        <FormTextField
          fullWidth
          error={!!errors.label}
          helperText={errors.label?.message}
          InputProps={{ ...register('label') }}
          label="Label"
          id="label"
        />
        <FormTextField
          fullWidth
          InputProps={{ ...register('iconLink') }}
          error={!!errors.iconLink}
          helperText={errors.iconLink?.message}
          label="IconLink"
          id="iconLink"
          type="url"></FormTextField>
        <FormTextField
          fullWidth
          InputProps={{ ...register('description') }}
          error={!!errors.description}
          helperText={errors.description?.message}
          label="Description"
          id="description"></FormTextField>
        <SubmitButton>save</SubmitButton>
      </Box>
    </form>
  )
}
