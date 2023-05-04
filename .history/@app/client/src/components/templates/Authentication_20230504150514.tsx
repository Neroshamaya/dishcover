import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import AuthenticationForm from '../organisms/AuthenticationForm'

interface AuthenticationProps {
  login: boolean
}

export default function Authentication({ login = true }: AuthenticationProps) {
  return <AuthenticationForm />
}
