import { UpdateIngredientQuery } from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'

export class IngredientUpdateToPrismaAdapter {
  static adapt({
    id,
    label,
    description,
    iconLink,
    authorId
  }: UpdateIngredientQuery): Prisma.IngredientUpdateArgs {
    return {
      where: { id },
      data: {
        label,
        description,
        iconLink,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    }
  }
}
