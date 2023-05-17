import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'

export class IngredientCreateToPrismaAdapter {
  static adapt({
    label,
    description,
    iconLink,
    authorId
  }: CreateIngredientQuery): Prisma.IngredientCreateArgs {
    return {
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
