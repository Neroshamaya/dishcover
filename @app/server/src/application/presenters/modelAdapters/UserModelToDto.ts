import User from '@/domain/models/User'
import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { UserDtoType } from '@dishcover/shared/types/resources'
import { Prisma, Ingredient as PrismaIngredient } from '@prisma/client'
export class UserModelToDto {
  static adapt(user: User): UserDtoType {
    {
      return {
        email: user.email.value,
        id: user.id.value
      }
    }
  }
}
