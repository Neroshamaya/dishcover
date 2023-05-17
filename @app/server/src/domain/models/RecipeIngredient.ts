import PrismaClient, { Prisma } from '@prisma/client'
import Ingredient from './Ingredient'
import Id from '../valueObjects/Id'
import { IngredientDtoType, RecipeIngredientDtoType } from '@dishcover/shared/types/resources'
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
