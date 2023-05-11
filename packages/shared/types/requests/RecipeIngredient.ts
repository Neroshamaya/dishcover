import { Optional, Overwrite } from 'utility-types'
import { RecipeIngredientDtoType } from '../resources/RecipeIngredient'
import z from 'zod'

export type CreateRecipeIngredientQuery = Overwrite<
  Omit<RecipeIngredientDtoType, 'id' | 'recipeId'>,
  { kind?: 'CreateRecipeIngredientQuery' }
>
