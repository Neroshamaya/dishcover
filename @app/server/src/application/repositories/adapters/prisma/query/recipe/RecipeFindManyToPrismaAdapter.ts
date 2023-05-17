import { GetAllRecipesQuery, GetUserRecipesQuery } from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'

export class RecipeFindManyToPrismaAdapter {
  static adapt({ userId }: GetAllRecipesQuery | GetUserRecipesQuery) {
    let query: Prisma.RecipeFindManyArgs = {}
    if (userId) {
      query = {
        ...query,
        where: {
          authorId: userId
        }
      }
    }

    return {
      ...query,
      include: {
        ingredients: {
          include: {
            details: true
          }
        },
        author: true
      }
    }
  }
}
