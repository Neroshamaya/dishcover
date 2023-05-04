import { useEffect, useContext, useState } from 'react'
import * as apiService from '../../services/apiService'
import UserContext from '../../contexts/UserContext'
import { RecipeDtoType } from '@dishcover/shared'
import RecipeApp from '../templates/RecipeApp'

export default function Create() {
  const [recipes, setRecipes] = useState<RecipeDtoType[]>([])
  const userContext = useContext(UserContext)
  useEffect(() => {
    const fetchRecipes = async () => {
      if (userContext.connectedUser != null) {
        const { data, error } = await apiService.retrieveUserRecipes(
          userContext.connectedUser.token
        )
        if (!error && data) {
          setRecipes(data)
        }
      }
    }
    fetchRecipes()
  }, [userContext.connectedUser])

  return <>
  <RecipeApp recipes={recipes}/>
  </>
