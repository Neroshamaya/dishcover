import { useContext } from 'react'

export default function AuthButton() {
  const { connectedUser } = useContext(UserContext)

  return (
    <Button variant="outlined" size="medium">
      Medium
    </Button>
  )
}
