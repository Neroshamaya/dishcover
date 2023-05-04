import { useEffect, useContext } from 'react'
import * as apiService from '../../services/apiService'
import UserContext from '../../contexts/UserContext'

export default function Create() {
  const userContext = useContext(UserContext)
  useEffect(() => {
    apiService.retrieveUserRecipes(userContext.connectedUser?.token)
  }, [])
  return
}
