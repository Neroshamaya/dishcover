import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useContext } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import UserContext from '../../contexts/UserContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchemaType, SignUpFormSchema } from '../../models/form/SignupForm'
import * as apiService from '../../services/apiService'
import { CreateRecipeQuery, CreateRecipeSchema } from '@dishcover/shared'

interface AuthenticationFormProps {
  onSubmit: () => void
  create: boolean
}

export default function RecipeForm({ onSubmit: postSubmit, create }: AuthenticationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateRecipeQuery>({
    resolver: zodResolver(CreateRecipeSchema)
  })
  const context = useContext(UserContext)
  const onSubmit: SubmitHandler<CreateRecipeSchema> = async (recipeInfos) => {
    const response = create
      ? await apiService.createRecipe(recipeInfos)
      : await apiService.updateRecipe(recipeInfos)
    if (!response?.error && response?.data?.token) {
      context.setConnectedUser({ ...response?.data?.user, token: response?.data?.token })
      postSubmit()
    }
  }

  return (
    <form>
      <AuthFormTitle>{login ? 'login' : 'register'}</AuthFormTitle>
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
