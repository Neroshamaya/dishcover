import { Typography } from '@mui/material'
import { AuthFormTitle } from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'

interface AuthenticationFormProps {
  onSubmit: () => {}
  register: boolean
}
export default function AuthenticationForm({ onSubmit, register }: AuthenticationFormProps) {
  return (
    <form>
      <AuthFormTitle>{register ? 'login' : 'register'}</AuthFormTitle>
      <FormTextField errorMessage="" label="email" id="email"></FormTextField>
    </form>
  )
}
