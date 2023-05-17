import { DeleteIngredientQuery } from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'

export class IngredientDeleteToPrismaAdapter {
  static adapt({ id }: DeleteIngredientQuery): Prisma.IngredientDeleteArgs {
    return {
      where: {
        id
      }
    }
  }
}
