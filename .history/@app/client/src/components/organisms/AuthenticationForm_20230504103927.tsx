import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useRef, useState, useContext } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import { FormError } from '../../models/FormError'
import { z } from 'zod'
import UserContext from '../../contexts/UserContext'
import useFormErrors from '../../hooks/useFormErrors'
import authenticationService from '../../services/authenticationService'

const passwordSchema = z.string().min(8, 'Password must have 8 characters')
const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword', 'password'] // path of error
  })

interface AuthenticationFormProps {
  onSubmit: () => void
  register: boolean
}

export default function AuthenticationForm({ onSubmit, register }: AuthenticationFormProps) {
  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)
  const passwordConfirm = useRef<HTMLInputElement | null>(null)
  const { setFormErrors, getError } = useFormErrors()
  const context = useContext(UserContext)

  async function handleSubmit() {
    setFormErrors([])
    const credentialsWithConfirmInput = {
      email: email.current?.value,
      password: password.current?.value,
      passwordConfirm: passwordConfirm.current?.value
    }
    const validation = SignUpSchema.safeParse(credentialsWithConfirmInput)
    if (validation.success) {
      const { data, formErrors } = await authenticationService.login(validation.data)
      if (!formErrors) {
        context.setConnectedUser(data)
        onSubmit()
      }
    }

    const errors: FormError[] = errorService.formatZodError(validation.error)
    setFormErrors(errors)
  }

  return (
    <form>
      <AuthFormTitle>{register ? 'login' : 'register'}</AuthFormTitle>
      <FormTextField inputRef={email} errorMessage="" label="Email" id="email"></FormTextField>
      <FormTextField
        inputRef={password}
        errorMessage={getError('password')}
        label="Password"
        id="password"
        type="password"></FormTextField>
      <FormTextField
        inputRef={passwordConfirm}
        errorMessage={getError('passwordConfirm')}
        label="Password Confirmation"
        id="passwordConfirm"></FormTextField>
      <SubmitButton onSubmit={handleSubmit}>submit</SubmitButton>
    </form>
  )
}
