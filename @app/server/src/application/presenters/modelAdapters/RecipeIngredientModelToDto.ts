import User from '@/domain/models/User'
import { CreateRecipeIngredientQuery } from '@dishcover/shared/types/requests'
import { UserDtoType } from '@dishcover/shared/types/resources'
import { Prisma, RecipeIngredient as PrismaRecipeIngredient } from '@prisma/client'
import RecipeIngredient from '@/domain/models/RecipeIngredient'
import { RecipeIngredientDtoType } from '@dishcover/shared/types/resources'
import { UserModelToDto } from './UserModelToDto'
import { IngredientModelToDto } from './IngredientModelToDto'

export class RecipeIngredientModelToDto {
  static adapt({
    ingredientId,
    quantity,
    recipeId,
    details,
    id
  }: RecipeIngredient): RecipeIngredientDtoType {
    {
      return {
        id: id.value,
        ingredientId: ingredientId.value,
        quantity: quantity,
        recipeId: recipeId.value,
        details: IngredientModelToDto.adapt(details)
      }
    }
  }
}
