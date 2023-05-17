import { z } from 'zod'
import { UserDtoType } from './User'
import { baseRecipeSchema } from '../../schemas/resources/Recipe'
import { RecipeIngredientDtoType } from './RecipeIngredient'

export type RecipeDtoType = Omit<
  z.infer<typeof baseRecipeSchema> & {
    recipeIngredients?: RecipeIngredientDtoType[]
    author: UserDtoType
  },
  'recipeIngredientIds' | 'authorId'
>
