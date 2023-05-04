import AuthenticationForm from '../organisms/AuthenticationForm'
import AuthFormTitle from '../atoms/authentication/AuthFormTitle'
import DishcoverAppBar from '../organisms/DishcoverAppBar'

interface AuthenticationProps {
  login: boolean
  onSubmit: () => void
}

export default function Authentication({ login = true, onSubmit }: AuthenticationProps) {
  return (
    <>
      <DishcoverAppBar>
        <AuthFormTitle>{login ? 'login' : 'register'}</AuthFormTitle>
        <AuthenticationForm login={login} onSubmit={onSubmit} />
      </DishcoverAppBar>
    </>
  )
}
