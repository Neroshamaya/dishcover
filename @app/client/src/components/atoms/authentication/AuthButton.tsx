import { Button } from '@mui/material'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import UserContext from '../../../contexts/UserContext'

export default function AuthButton() {
  const userContext = useContext(UserContext)
  const location = useLocation()
  if (userContext.getConnectedUser()) {
    return (
      <Button variant="outlined" size="medium" href="/logout">
        logout
      </Button>
    )
  }
  if (location.pathname != '/login') {
    return (
      <Button
        sx={{
          color: 'white',
          borderColor: 'white',
          fontWeight: 'bold'
        }}
        variant="outlined"
        size="medium"
        href="/login">
        login
      </Button>
    )
  }
  return (
    <Button
      sx={{
        color: 'white',
        borderColor: 'white',
        fontWeight: 'bold'
      }}
      variant="outlined"
      size="medium"
      href="/register">
      register
    </Button>
  )
}
