import AuthenticationForm, { AuthenticationFormProps } from '../organisms/AuthenticationForm'
import AuthFormTitle from '../atoms/authentication/AuthFormTitle'

type AuthenticationProps = {
  login?: boolean
} & AuthenticationFormProps

export default function Authentication(props: AuthenticationProps) {
  return (
    <>
      <AuthFormTitle>{props.login ? 'login' : 'register'}</AuthFormTitle>
      {<AuthenticationForm {...props} />}
    </>
  )
}
