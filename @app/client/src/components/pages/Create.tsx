import { RecipeDtoType } from '@dishcover/shared/types/resources/Recipe'
import { Box, Dialog } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import UserContext from '../../contexts/UserContext'
import * as apiService from '../../services/apiService'
import * as store from '../../store'
import RecipeCardCreateButton from '../atoms/recipe/RecipeCreateButton'
import RecipeForm from '../organisms/RecipeForm'
import Layout from '../templates/Layout'
import RecipeApp from '../templates/RecipeApp'

export default function Create() {
  const userContext = useContext(UserContext)
  const snap = useSnapshot(store.state) as typeof store.state
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDtoType | null>(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setSelectedRecipe(null)
    setOpen(false)
  }

  useEffect(() => {
    if (!userContext.getConnectedUser()) {
      navigate('/login')
    }
  }, [navigate, userContext])

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = userContext.getConnectedUser()?.token
      if (token) {
        const { data, error } = await apiService.retrieveUserRecipes(token)
        if (!error && data) {
          store.setRecipes(data)
        }
      }
    }
    fetchRecipes()
  }, [userContext])

  useEffect(() => {
    const fetchIngredients = async () => {
      const { data, error } = await apiService.getIngredients()
      if (!error && data) {
        store.setIngredients(data)
      }
    }
    fetchIngredients()
  }, [])

  const onSubmitForm = async (recipe: RecipeDtoType) => {
    store.upsertRecipe(recipe)
    setSelectedRecipe(null)
    closeModal()
    return
  }

  const onClickDelete = async (recipe: RecipeDtoType) => {
    const token = userContext.getConnectedUser()?.token
    if (token && recipe.id) {
      const { error } = await apiService.deleteRecipe({ id: recipe.id }, token)

      if (!error) {
        store.deleteRecipe(recipe.id)
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
      <Dialog fullWidth open={open} onClose={closeModal}>
        <RecipeForm recipe={selectedRecipe} onSubmit={onSubmitForm} />
      </Dialog>
      <Box sx={{ textAlign: 'center' }}>
        <RecipeCardCreateButton onClick={openCreateForm}>
          Create a new Recipe
        </RecipeCardCreateButton>
        <RecipeApp
          recipes={snap.recipes}
          cardActionCallbacks={{
            onClickDelete,
            onClickEdit
          }}
        />
      </Box>
    </Layout>
  )
}
