import { ApiError } from '@dishcover/shared'
import { LoginQuerySchema } from '@dishcover/shared/schemas'
import { LoginQuery } from '@dishcover/shared/types/requests'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import NotRegistredLink from '../atoms/authentication/NotRegistredLink'
import FormTextField from '../atoms/form/FormTextField'
import SubmitButton from '../atoms/form/SubmitButton'
export interface LoginFormProps {
  onSubmit: (credentials: LoginQuery) => Promise<ApiError<LoginQuery> | undefined>
}
export default function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginQuery>({
    resolver: zodResolver(LoginQuerySchema),
    mode: 'onChange'
  })

  const checkServerErrors: SubmitHandler<LoginQuery> = async function (data) {
    const error = await onSubmit(data)

    if (error && error.details) {
      if (Array.isArray(error.details)) {
        for (const detail of error.details) {
          if (detail.fields) {
            for (const field of detail.fields) {
              setError(field as keyof LoginQuery, { message: detail.message || error.message })
            }
          }
        }
        return
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(checkServerErrors)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          margin: 'auto',

          rowGap: 2
        }}>
        <AuthFormTitle>login</AuthFormTitle>
        <FormTextField
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{ ...register('email') }}
          label="Email"
          autoComplete="username"
          id="email"
        />
        <FormTextField
          InputProps={{ ...register('password') }}
          error={!!errors.password}
          helperText={errors.password?.message}
          label="Password"
          id="password"
          autoComplete="current-password"
          type="password"></FormTextField>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', columnGap: 1 }}>
          <NotRegistredLink />
          <SubmitButton>submit</SubmitButton>
        </Box>
      </Box>
    </form>
  )
}
