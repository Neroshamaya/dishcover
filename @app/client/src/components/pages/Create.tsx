import { useEffect, useContext, useState } from 'react'
import * as apiService from '../../services/apiService'
import UserContext from '../../contexts/UserContext'
import { RecipeDtoType } from '@dishcover/shared'
import RecipeApp from '../templates/RecipeApp'
import { Dialog } from '@mui/material'
import RecipeForm from '../organisms/RecipeForm'
import RecipeCardCreateButton from '../atoms/recipe/RecipeCreateButton'
import * as store from '../../store'
import Layout from '../templates/Layout'

export default function Create() {
  const userContext = useContext(UserContext)
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDtoType | null>(null)
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setSelectedRecipe(null)
    setOpen(false)
  }
  useEffect(() => {
    const fetchRecipes = async () => {
      if (userContext.connectedUser != null) {
        const { data, error } = await apiService.retrieveUserRecipes(
          userContext.connectedUser.token
        )
        if (!error && data) {
          store.setRecipes(data)
        }
      }
    }
    fetchRecipes()
  }, [userContext.connectedUser])

  const onSubmitForm = async (recipe: RecipeDtoType) => {
    const token = userContext.connectedUser?.token
    if (token) {
      if (recipe.id) {
        const { data, error } = await apiService.updateRecipe(recipe, token)
        if (!error && data) {
          store.updateRecipe(data)
        }
      } else {
        const { data, error } = await apiService.createRecipe(recipe, token)
        if (!error && data) {
          store.addRecipe(data)
        }
      }
      closeModal()
      return
    }
    throw Error('You must be logged in to create a recipe')
  }

  const onClickDelete = async (recipe: RecipeDtoType) => {
    const token = userContext.connectedUser?.token
    if (token) {
      const { data, error } = await apiService.deleteRecipe(recipe, token)
      if (!error && data) {
        store.deleteRecipe(data)
      }
    }
  }

  const onClickEdit = async (recipe: RecipeDtoType) => {
    setSelectedRecipe(recipe)
    openModal()
  }

  const openCreateForm = async () => {
    setSelectedRecipe(null)
    openModal()
  }

  return (
    <Layout>
      <Dialog open={open} onClose={closeModal}>
        <RecipeForm create={!!selectedRecipe} recipe={selectedRecipe} onSubmit={onSubmitForm} />
      </Dialog>
      <RecipeCardCreateButton onClick={openCreateForm}>Create a new Recipe</RecipeCardCreateButton>
      <RecipeApp
        recipes={store.state.recipes}
        cardActionCallbacks={{
          onClickDelete,
          onClickEdit
        }}
      />
    </Layout>
  )
}
