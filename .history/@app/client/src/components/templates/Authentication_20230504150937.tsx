import AuthenticationForm from '../organisms/AuthenticationForm'
import AuthFormTitle from '../atoms/authentication/AuthFormTitle

interface AuthenticationProps {
  login: boolean
  onSubmit: () => void
}

export default function Authentication({ login = true, onSubmit }: AuthenticationProps) {
  return <><AuthFormTitle>{login ? 'login' : 'register'}</AuthFormTitle><AuthenticationForm login={login} onSubmit={onSubmit} /></>
}
