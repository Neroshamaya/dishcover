import Id from '../valueObjects/Id'
import Ingredient from './Ingredient'
interface RecipeIngredientParams {
  readonly id: Id
  readonly ingredientId: Id
  readonly quantity: number
  readonly recipeId: Id
  readonly details: Ingredient
}
export default class RecipeIngredient {
  readonly id
  readonly ingredientId
  readonly quantity
  readonly recipeId
  readonly details: Ingredient
  constructor({ id, ingredientId, quantity, recipeId, details }: RecipeIngredientParams) {
    this.id = id
    this.ingredientId = ingredientId
    this.quantity = quantity
    this.recipeId = recipeId
    this.details = details
  }
}
