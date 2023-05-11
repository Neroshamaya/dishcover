import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import UserContext from '../../contexts/UserContext'

export default function Logout() {
  const context = useContext(UserContext)
  context.unsetConnectedUser()
  return <Navigate to={'/'} />
}
