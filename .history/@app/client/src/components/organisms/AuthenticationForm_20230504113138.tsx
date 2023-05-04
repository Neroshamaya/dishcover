import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import FormTextField from '../atoms/form/FormTextField'
import { useRef, useState, useContext } from 'react'
import SubmitButton from '../atoms/form/SubmitButton'
import { FormError } from '../../models/FormError'
import { z } from 'zod'
import UserContext from '../../contexts/UserContext'
import useFormErrors from '../../hooks/useFormErrors'
import * as authenticationService from '../../services/authenticationService'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormSchemaType, SignUpFormSchema } from '../../models/form/SignupForm'

interface AuthenticationFormProps {
  onSubmit: () => void
  login: boolean
}

export default function AuthenticationForm({ onSubmit: postSubmit, login }: AuthenticationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors  }
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema)
  })
  const context = useContext(UserContext)
  const onSubmit: SubmitHandler<SignUpFormSchemaType> = (userInfos) => {
    
      const { data, error } = login ? await authenticationService.login(userInfos) : await authenticationService.register(userInfos)
      if (!formErrors) {
        context.setConnectedUser(data)
        postSubmit()
      }
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
