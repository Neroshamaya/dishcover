import { useContext } from 'react'

export default function AuthButton() {
  const { connectedUser } = useContext(UserContext)

  return connectedUser ? (
    <Button variant="outlined" size="medium">
      logout
    </Button>
  ) : (
    <Button variant="outlined" size="medium">
      login
    </Button>
  )
}
