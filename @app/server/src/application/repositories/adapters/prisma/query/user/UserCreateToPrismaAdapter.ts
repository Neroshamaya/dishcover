import {
  GetAllRecipesQuery,
  GetUserRecipesQuery,
  CreateRecipeIngredientQuery,
  LoginQuery,
  RegisterQuery
} from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'
import Email from '@/domain/valueObjects/Email'

export class UserCreateToPrismaAdapter {
  static adapt({ email, salt, password }: { email: string; password: string; salt: string }) {
    return {
      data: {
        email,
        salt,
        password
      }
    }
  }
}
