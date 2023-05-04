import { Typography } from '@mui/material'
import { AuthFormTitle } from '../atoms/authentication/AuthFormTitle'

interface AuthenticationFormProps {
  onSubmit: () => {}
}
export default function AuthenticationForm({ onSubmit }: AuthenticationFormProps) {
  return (
    <form>
      <AuthFormTitle></AuthFormTitle>
    </form>
  )
}
