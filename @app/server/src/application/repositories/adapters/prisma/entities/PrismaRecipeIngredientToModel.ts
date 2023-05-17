import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import {
  Prisma,
  Recipe as PrismaRecipe,
  User as PrismaUser,
  Ingredient as PrismaIngredient,
  RecipeIngredient as PrismaRecipeIngredient
} from '@prisma/client'
import Ingredient from '@/domain/models/Ingredient'
import Id from '@/domain/valueObjects/Id'
Id
import Uri from '@/domain/valueObjects/Uri'
import Email from '@/domain/valueObjects/Email'
import User from '@/domain/models/User'
import RecipeIngredient from '@/domain/models/RecipeIngredient'
import { PrismaIngredientToModel } from './PrismaIngredientToModel'

export class PrismaRecipeIngredientToModel {
  static adapt({
    id,
    ingredientId,
    quantity,
    recipeId,
    details
  }: PrismaRecipeIngredient & {
    details?: PrismaIngredient
  }): RecipeIngredient {
    {
      return new RecipeIngredient({
        id: new Id(id),
        ingredientId: new Id(ingredientId),
        quantity: quantity as number,
        recipeId: new Id(recipeId),
        details: details ? PrismaIngredientToModel.adapt(details) : null
      })
    }
  }
}
