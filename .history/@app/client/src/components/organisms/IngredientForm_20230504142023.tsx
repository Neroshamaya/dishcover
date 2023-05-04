import IngredientFormTitle from '../atoms/ingredient/IngredientFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useContext } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import UserContext from '../../contexts/UserContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchema } from '../../models/form/SignupForm'
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
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
        label="Email"
        id="email"></FormTextField>
      <FormTextField
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        label="Password"
        id="password"
        type="password"></FormTextField>
      <FormTextField
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        label="Password Confirmation"
        id="confirmPassword"></FormTextField>
      <SubmitButton onSubmit={handleSubmit(onSubmit)}>submit</SubmitButton>
    </form>
  )
}
