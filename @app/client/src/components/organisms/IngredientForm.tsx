import IngredientFormTitle from '../atoms/ingredient/IngredientFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useContext } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import UserContext from '../../contexts/UserContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchema } from '../../models/form/RegisterForm'
import { CreateIngredientQuery, CreateIngredientSchema } from '@dishcover/shared'
import * as apiService from '../../services/apiService'
interface IngredientFormProps {
  onSubmit: () => void
  create: boolean
}

export default function IngredientForm({
  onSubmit: postSubmit,
  create = true
}: IngredientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateIngredientQuery>({
    resolver: zodResolver(CreateIngredientSchema)
  })
  const context = useContext(UserContext)
  const onSubmit: SubmitHandler<CreateIngredientQuery> = async (ingredientInfos) => {
    const response = create
      ? await apiService.createIngredient({
          ...ingredientInfos,
          authorId: context.connectedUser?.id
        })
      : await apiService.updateIngredient({
          ...ingredientInfos,
          authorId: context.connectedUser?.id
        })
    if (!response?.error) {
      postSubmit()
    }
  }

  return (
    <form>
      <IngredientFormTitle>{create ? 'create' : 'edit'} an ingredient</IngredientFormTitle>
      <FormTextField
        error={!!errors.label}
        helperText={errors.label?.message}
        {...register('label')}
        label="Label"
        id="label"></FormTextField>
      <FormTextField
        {...register('iconLink')}
        error={!!errors.iconLink}
        helperText={errors.iconLink?.message}
        label="IconLink"
        id="iconLink"
        type="url"></FormTextField>
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
