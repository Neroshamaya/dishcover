import { useEffect, useContext, useState } from 'react'
import * as apiService from '../../services/apiService'
import UserContext from '../../contexts/UserContext'
import { RecipeDtoType } from '@dishcover/shared'
import RecipeApp from '../templates/RecipeApp'
import ModalFormDialog from '../atoms/form/ModalFormDialog'
import RecipeForm from '../organisms/RecipeForm'

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

  onSubmitForm = async (recipe: RecipeDtoType) => {
    const token = userContext.connectedUser?.token
    if(token){
      const { data, error } = await apiService.createRecipe({...recipe, token)
      if (!error && data) {
        setRecipes([...recipes, data])
      }
    }
  }

  return (
    <>
      <ModalFormDialog>
        <RecipeForm />
      </ModalFormDialog>
      <RecipeApp recipes={recipes} />
    </>
  )
}
