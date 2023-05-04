import { useContext } from 'react'

export default function AuthButton() {
  const { connectedUser } = useContext(UserContext)

  return connectedUser ? (
    <Button variant="outlined" size="medium" href="/logout">
      logout
    </Button>
  ) : (
    <Button variant="outlined" size="medium" href="/login">
      login
    </Button>
  )
}
