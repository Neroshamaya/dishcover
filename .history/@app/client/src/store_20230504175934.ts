import { RecipeDtoType, RecipeIngredientDtoType } from '@dishcover/shared' // The Recipe and RecipeIngredient DTO types from the Zod schemas
import { proxy } from 'valtio'

// Define the state object using Valtio
const state = proxy({
  recipes: [] as RecipeDtoType[],
  ingredients: [] as RecipeIngredientDtoType[]
})

// Define a function to set the list of recipes
export function setRecipes(recipes: RecipeDtoType[]) {
  state.recipes = recipes
}

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

// Define a function to delete a recipe from the list
export function deleteRecipe(id: string) {
  state.recipes = state.recipes.filter((r) => r.id !== id)
}

// Define a function to add a recipe ingredient to a recipe
export function addRecipeIngredient(recipeId: string, ingredient: RecipeIngredientDtoType) {
  const recipe = state.recipes.find((r) => r.id === recipeId)
  if (recipe) {
    if (!recipe.ingredients) {
      recipe.ingredients = []
    }
    recipe.ingredients.push(ingredient)
    updateRecipe(recipe)
  }
}

// Define a function to update a recipe ingredient in a recipe
export function updateRecipeIngredient(recipeId: string, ingredient: RecipeIngredientDtoType) {
  const recipe = state.recipes.find((r) => r.id === recipeId)
  if (recipe && recipe.ingredients) {
    const index = recipe.ingredients.findIndex((ri) => ri.id === ingredient.id)
    if (index !== -1) {
      recipe.ingredients[index] = ingredient
      updateRecipe(recipe)
    }
  }
}

// Define a function to remove a recipe ingredient from a recipe
export function removeRecipeIngredient(recipeId: string, ingredientId: string) {
  const recipe = state.recipes.find((r) => r.id === recipeId)
  if (recipe && recipe.ingredients) {
    recipe.ingredients = recipe.ingredients.filter((ri) => ri.id !== ingredientId)
    updateRecipe(recipe)
  }
}
