import { Typography } from '@mui/material'
import { AuthFormTitle } from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useRef } from 'React'

interface AuthenticationFormProps {
  onSubmit: () => void
  register: boolean
}
export default function AuthenticationForm({ onSubmit, register }: AuthenticationFormProps) {
  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)
  const passwordConfirm = useRef<HTMLInputElement | null>(null)

  return (
    <form>
      <AuthFormTitle>{register ? 'login' : 'register'}</AuthFormTitle>
      <FormTextField errorMessage="" label="Email" id="email"></FormTextField>
      <FormTextField errorMessage="" label="Password" id="password" type="password"></FormTextField>
      <FormTextField
        errorMessage=""
        label="Password Confirmation"
        id="passwordConfirm"></FormTextField>
    </form>
  )
}
