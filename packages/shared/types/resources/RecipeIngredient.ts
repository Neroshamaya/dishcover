import { z } from 'zod'
import { baseRecipeIngredientSchema } from '../../schemas/resources/RecipeIngredient'
import { IngredientDtoType } from './Ingredient'

export type RecipeIngredientDtoType = z.infer<typeof baseRecipeIngredientSchema> & {
  details?: IngredientDtoType | null
  kind?: 'RecipeIngredientDtoType'
}
