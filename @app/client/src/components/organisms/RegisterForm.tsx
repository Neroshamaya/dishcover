import { ApiError } from '@dishcover/shared'
import { RegisterQuerySchema } from '@dishcover/shared/schemas'
import { RegisterQuery } from '@dishcover/shared/types/requests'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import SubmitButton from '../atoms/form/SubmitButton'
export interface RegisterFormProps {
  onSubmit: (credentials: RegisterQuery) => Promise<ApiError<RegisterQuery> | undefined>
}
export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterQuery>({
    resolver: zodResolver(RegisterQuerySchema),
    mode: 'onChange'
  })
  const navigate = useNavigate()

  const checkServerErrors: SubmitHandler<RegisterQuery> = async function (data) {
    const error = await onSubmit(data)

    if (error && error.details) {
      if (Array.isArray(error.details)) {
        for (const detail of error.details) {
          if (detail.fields) {
            for (const field of detail.fields) {
              setError(field as keyof RegisterQuery, { message: detail.message || error.message })
            }
          }
        }
        return
      }
    }
    navigate('/create')
  }

  return (
    <form onSubmit={handleSubmit(checkServerErrors)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          margin: 'auto',
          alignItems: 'center',
          rowGap: 2
        }}>
        <AuthFormTitle>register</AuthFormTitle>
        <FormTextField
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{ ...register('email') }}
          autoComplete="username"
          label="Email"
          id="email"></FormTextField>
        <FormTextField
          autoComplete="new-password"
          InputProps={{ ...register('password') }}
          error={!!errors.password}
          helperText={errors.password?.message}
          label="Password"
          id="password"
          type="password"></FormTextField>
        <FormTextField
          autoComplete="new-password"
          InputProps={{ ...register('confirmPassword') }}
          error={!!errors?.confirmPassword}
          helperText={errors.confirmPassword?.message}
          label="Password Confirmation"
          id="confirmPassword"
          type="password"></FormTextField>

        <SubmitButton>submit</SubmitButton>
      </Box>
    </form>
  )
}
