import { z } from 'zod'
import { UserDtoType } from './User'
import { baseRecipeSchema } from '../../schemas/resources/Recipe'
import { RecipeIngredientDtoType } from './RecipeIngredient'
import { CreateRecipeIngredientQuery } from '../requests'

export type RecipeDtoType = z.infer<typeof baseRecipeSchema> & {
  recipeIngredients?: RecipeIngredientDtoType[]
  recipeIngredientIds: string[]
  author: UserDtoType
  kind?: 'RecipeDtoType'
}
