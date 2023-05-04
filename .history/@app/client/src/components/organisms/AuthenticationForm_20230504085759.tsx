import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useRef } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import { z } from 'zod'

const passwordSchema = z.string().min(8)
const signUpSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  confirmPassword: passwordSchema.refine(
    (confirmPassword, data) => confirmPassword === data.password,
    {
      message: "Passwords don't match"
    }
  )
})

interface AuthenticationFormProps {
  onSubmit: () => void
  register: boolean
}

export default function AuthenticationForm({ onSubmit, register }: AuthenticationFormProps) {
  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)
  const passwordConfirm = useRef<HTMLInputElement | null>(null)

  async function handleSubmit() {
    const credentialsWithConfirmInput = {
      email: email.current?.value,
      password: password.current?.value,
      passwordConfirm: passwordConfirm.current?.value
    }

    const { data, formErrors } = await authenticationService.login()
  }

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
      <SubmitButton onSubmit={handleSubmit}>submit</SubmitButton>
    </form>
  )
}
