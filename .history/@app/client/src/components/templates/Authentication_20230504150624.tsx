import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import AuthenticationForm from '../organisms/AuthenticationForm'

interface AuthenticationProps {
  login: boolean
  onSubmit: () => void
}

export default function Authentication({ login = true, onSubmit }: AuthenticationProps) {
  return <AuthenticationForm login />
}
