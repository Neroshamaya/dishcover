import { DeleteRecipeQuery } from '@dishcover/shared/types/requests'

export class RecipeDeleteToPrismaAdapter {
  static adapt({ id }: DeleteRecipeQuery) {
    return {
      where: {
        id
      }
    }
  }
}
