import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useRef } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'

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
      <FormTextField inputRef={email} errorMessage="" label="Email" id="email"></FormTextField>
      <FormTextField
        inputRef={password}
        errorMessage=""
        label="Password"
        id="password"
        type="password"></FormTextField>
      <FormTextField
        inputRef={passwordConfirm}
        errorMessage=""
        label="Password Confirmation"
        id="passwordConfirm"></FormTextField>
      <SubmitButton />
    </form>
  )
}
