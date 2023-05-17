import {
  GetAllRecipesQuery,
  GetUserRecipesQuery,
  CreateRecipeIngredientQuery,
  LoginQuery
} from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'

export class UserFindOneToPrismaAdapter {
  static adapt({ email }: LoginQuery) {
    return {
      where: {
        email
      }
    }
  }
}
