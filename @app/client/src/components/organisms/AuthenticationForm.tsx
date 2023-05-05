import FormTextField from '../atoms/form/FormTextField'
import SubmitButton from '../atoms/form/SubmitButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterQuery, LoginQuery, RegisterQuerySchema, LoginQuerySchema } from '@dishcover/shared'
import NotRegistredLink from '../atoms/authentication/NotRegistredLink'
import { Container } from '@mui/material'

export interface AuthenticationFormProps {
  onSubmit: SubmitHandler<LoginQuery> | SubmitHandler<RegisterQuery>
}

function AuthenticationFormLogin({ onSubmit }: AuthenticationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginQuery>({
    resolver: zodResolver(LoginQuerySchema)
  })

  return (
    <form>
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

      <Container>
        <NotRegistredLink />
        <SubmitButton onSubmit={handleSubmit(onSubmit as SubmitHandler<LoginQuery>)}>
          submit
        </SubmitButton>
      </Container>
    </form>
  )
}

function AuthenticationFormRegister({ onSubmit }: AuthenticationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterQuery>({
    resolver: zodResolver(RegisterQuerySchema)
  })

  return (
    <form>
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
        error={!!errors?.confirmPassword}
        helperText={errors.confirmPassword?.message}
        label="Password Confirmation"
        id="confirmPassword"></FormTextField>

      <Container>
        <SubmitButton onSubmit={handleSubmit(onSubmit as SubmitHandler<RegisterQuery>)}>
          submit
        </SubmitButton>
      </Container>
    </form>
  )
}

export default function AuthenticationForm({
  onSubmit,
  login = false
}: AuthenticationFormProps & { login?: boolean }) {
  return login ? (
    <AuthenticationFormLogin onSubmit={onSubmit} />
  ) : (
    <AuthenticationFormRegister onSubmit={onSubmit} />
  )
}
