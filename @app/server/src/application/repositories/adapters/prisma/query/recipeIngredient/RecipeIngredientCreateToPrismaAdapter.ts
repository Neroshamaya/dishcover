import { CreateRecipeIngredientQuery } from '@dishcover/shared/types/requests'

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
