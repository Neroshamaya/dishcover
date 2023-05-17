import { DeleteIngredientQuery, DeleteRecipeQuery } from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'

export class RecipeDeleteToPrismaAdapter {
  static adapt({ id }: DeleteRecipeQuery) {
    return {
      where: {
        id
      }
    }
  }
}
