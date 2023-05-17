import {
  Ingredient as PrismaIngredient,
  RecipeIngredient as PrismaRecipeIngredient
} from '@prisma/client'

import Id from '@/domain/valueObjects/Id'
Id
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
