import { IngredientDtoType, RecipeDtoType } from '@dishcover/shared/types/resources' // The Recipe and RecipeIngredient DTO types from the Zod schemas
import { proxy } from 'valtio'

// Define the state object using Valtio
export const state = proxy({
  recipes: [] as RecipeDtoType[],
  ingredients: [] as IngredientDtoType[]
})

// Define a function to add a new recipe to the list
export function addRecipe(recipe: RecipeDtoType) {
  state.recipes.push(recipe)
}

// Define a function to update an existing recipe in the list
export function updateRecipe(recipe: RecipeDtoType) {
  const index = state.recipes.findIndex((r) => r.id === recipe.id)
  if (index !== -1) {
    state.recipes[index] = recipe
  }
}

export function upsertRecipe(recipe: RecipeDtoType) {
  const index = state.recipes.findIndex((r) => r.id === recipe.id)
  if (index === -1) {
    addRecipe(recipe)
  } else {
    updateRecipe(recipe)
  }
}

// Define a function to delete a recipe from the list
export function deleteRecipe(id: string) {
  state.recipes = state.recipes.filter((r) => r.id !== id)
}

// Define a function to set the list of ingredients
export function setIngredients(ingredients: IngredientDtoType[]) {
  state.ingredients = ingredients
}

// Define a function to set the list of recipes
export function setRecipes(recipes: RecipeDtoType[]) {
  state.recipes = recipes
}

// Define a function to add a new ingredient to the list
export function addIngredient(ingredient: IngredientDtoType) {
  state.ingredients.push(ingredient)
}

// Define a function to update an existing ingredient in the list
export function updateIngredient(ingredient: IngredientDtoType) {
  const index = state.ingredients.findIndex((i) => i.id === ingredient.id)
  if (index !== -1) {
    state.ingredients[index] = ingredient
  }
}

// Define a function to delete an ingredient from the list
export function deleteIngredient(id: string) {
  state.ingredients = state.ingredients.filter((i) => i.id !== id)
}
