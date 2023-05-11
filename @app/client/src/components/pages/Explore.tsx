import { RecipeDtoType } from '@dishcover/shared/types/resources/Recipe'
import { useEffect, useState } from 'react'

import * as apiService from '../../services/apiService'
import * as store from '../../store'
import Layout from '../templates/Layout'
import RecipeApp from '../templates/RecipeApp'

export default function Explore() {
  const [recipes, setRecipes] = useState<RecipeDtoType[]>([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await apiService.retrieveAllRecipes()
      if (!error && data) {
        store.setRecipes(data)
        setRecipes(data)
      }
    }
    fetchRecipes()
  }, [])

  return (
    <Layout>
      <RecipeApp recipes={recipes} />
    </Layout>
  )
}
