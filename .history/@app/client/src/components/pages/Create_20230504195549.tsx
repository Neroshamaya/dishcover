import { useEffect, useContext, useState } from 'react'
import * as apiService from '../../services/apiService'
import UserContext from '../../contexts/UserContext'
import { RecipeDtoType } from '@dishcover/shared'
import RecipeApp from '../templates/RecipeApp'
import { Dialog } from '@mui/material'
import RecipeForm from '../organisms/RecipeForm'

export default function Create() {
  const [recipes, setRecipes] = useState<RecipeDtoType[]>([])
  const userContext = useContext(UserContext)
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDtoType>({})
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
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

  const onSubmitForm = async (recipe: RecipeDtoType) => {
    const token = userContext.connectedUser?.token
    if (token) {
      const { data, error } = await apiService.createRecipe(recipe, token)
      if (!error && data) {
        setRecipes([...recipes, data])
      }
    }
  }

  const onClickDelete = async (recipe: RecipeDtoType) => {
    const token = userContext.connectedUser?.token
    if (token) {
      const { data, error } = await apiService.deleteRecipe(recipe, token)
      if (!error && data) {
        setRecipes(recipes.filter((r) => r.id !== recipe.id))
      }
    }
  }
  const onClickEdit = async (recipe: RecipeDtoType) => {
    const token = userContext.connectedUser?.token
    if (token) {
      const { data, error } = await apiService.updateRecipe(recipe, token)
      if (!error && data) {
        setRecipes(recipes.filter((r) => r.id !== recipe.id))
      }
    }
  }

  return (
    <>
      <Dialog open={open} onClose={closeModal}>
        <RecipeForm create={!!selectedRecipe} recipe={selectedRecipe} onSubmit={onSubmitForm} />
      </Dialog>
      <RecipeApp
        cardActionCallbacks={{
          onClickDelete,
          onClickEdit,
          openModal
        }}
        recipes={recipes}
      />
    </>
  )
}
