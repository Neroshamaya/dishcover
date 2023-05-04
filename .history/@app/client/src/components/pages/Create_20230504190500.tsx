import { useEffect, useContext, useState } from 'react'
import * as apiService from '../../services/apiService'
import UserContext from '../../contexts/UserContext'
import { RecipeDtoType } from '@dishcover/shared'

export default function Create() {
  const [recipes, setRecipes] = useState<RecipeDtoType[]>([])
  const userContext = useContext(UserContext)
  useEffect(() => {
    
      const fetchRecipes = async () => {
        if (userContext.connectedUser != null) {
          const response = await apiService.retrieveUserRecipes(userContext.connectedUser.token)}
        setRecipes(response)
      }
    }
  }, [userContext.connectedUser])

  return
}