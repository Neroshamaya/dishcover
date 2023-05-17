import User from '@/domain/models/User'
import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { RecipeDtoType, UserDtoType } from '@dishcover/shared/types/resources'
import { Prisma, Ingredient as PrismaIngredient } from '@prisma/client'
import Ingredient from '@/domain/models/Ingredient'
import { UserModelToDto } from './UserModelToDto'
import { RecipeIngredientModelToDto } from './RecipeIngredientModelToDto'
import Recipe from '@/domain/models/Recipe'

export class RecipeModelToDto {
  static adapt({
    author,
    created,
    updated,
    description,
    id,
    label,
    image,
    recipeIngredients
  }: Recipe): RecipeDtoType {
    return {
      author: UserModelToDto.adapt(author),
      created,
      updated,
      description,
      id: id.value,
      image: image?.value,
      recipeIngredients: recipeIngredients.map((i) => RecipeIngredientModelToDto.adapt(i)),
      label
    }
  }
}
