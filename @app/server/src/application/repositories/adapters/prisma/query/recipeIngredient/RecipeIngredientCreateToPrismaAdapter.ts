import {
  GetAllRecipesQuery,
  GetUserRecipesQuery,
  CreateRecipeIngredientQuery
} from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'

export class RecipeIngredientCreateToPrismaAdapter {
  static adapt({ ingredientId, quantity, recipeId }: CreateRecipeIngredientQuery) {
    return {
      data: {
        recipeId,
        ingredientId,
        quantity
      }
    }
  }
}
