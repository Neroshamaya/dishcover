import { useEffect } from 'react'
import * as apiService from '../../services/apiService'
import RecipeApp from '../templates/RecipeApp'
import * as store from '../../store'
import Layout from '../templates/Layout'

export default function Explore() {
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await apiService.retrieveAllRecipes()
      if (!error && data) {
        store.setRecipes(data)
      }
    }
    fetchRecipes()
  }, [])

  return (
    <Layout>
      <RecipeApp recipes={store.state.recipes} />
    </Layout>
  )
}
