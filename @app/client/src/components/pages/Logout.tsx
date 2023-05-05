import UserContext from '../../contexts/UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function Logout() {
  const context = useContext(UserContext)
  context.unsetConnectedUser()
  return <Navigate to={'/'} />
}
