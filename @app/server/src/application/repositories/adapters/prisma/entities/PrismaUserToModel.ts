import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import {
  Prisma,
  Recipe as PrismaRecipe,
  User as PrismaUser,
  User as PrismaIngredient,
  RecipeIngredient as PrismaRecipeIngredient
} from '@prisma/client'
import Ingredient from '@/domain/models/Ingredient'
import Id from '@/domain/valueObjects/Id'
Id
import Uri from '@/domain/valueObjects/Uri'
import Email from '@/domain/valueObjects/Email'
import User from '@/domain/models/User'

export class PrismaUserToModel {
  static adapt(prismaUser: PrismaUser): User {
    {
      return new User({
        id: new Id(prismaUser.id),
        created: prismaUser.created as Date,
        email: new Email(prismaUser.email as string),
        salt: prismaUser.salt as string,
        password: prismaUser.password as string,
        updated: prismaUser.updated as Date
      })
    }
  }
}
