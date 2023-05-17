import { RecipeIngredientDtoType } from '@dishcover/shared/types/resources'

import RecipeIngredient from '@/domain/models/RecipeIngredient'

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
