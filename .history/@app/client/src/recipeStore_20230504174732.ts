import { Recipe } from './models' // The Recipe interface from the Zod schemas
import { proxy } from 'valtio'

// Define the state object using Valtio
export const state = proxy({
  recipes: [] as Recipe[]
})

// Define a function to set the list of recipes
export function setRecipes(recipes: Recipe[]) {
  state.recipes = recipes
}

// Define a function to add a new recipe to the list
export function addRecipe(recipe: Recipe) {
  state.recipes.push(recipe)
}

// Define a function to update an existing recipe in the list
export function updateRecipe(recipe: Recipe) {
  const index = state.recipes.findIndex((r) => r.id === recipe.id)
  if (index !== -1) {
    state.recipes[index] = recipe
  }
}

// Define a function to delete a recipe from the list
export function deleteRecipe(id: number) {
  state.recipes = state.recipes.filter((r) => r.id !== id)
}
