import { RecipeDtoType } from '@dishcover/shared/types/resources'

import Recipe from '@/domain/models/Recipe'

import { RecipeIngredientModelToDto } from './RecipeIngredientModelToDto'
import { UserModelToDto } from './UserModelToDto'

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
