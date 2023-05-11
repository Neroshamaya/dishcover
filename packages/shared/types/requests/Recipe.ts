import { CreateRecipeQuerySchema, DeleteRecipeQuerySchema } from '../../schemas/requests/Recipe'
import { Overwrite } from 'utility-types'

import z from 'zod'
import { RecipeIngredientSchema } from '../../schemas/resources/RecipeIngredient'
import { CreateRecipeIngredientQuery } from './RecipeIngredient'
import { GetUserRecipesQuerySchema } from '../../schemas/requests/Recipe'
import { RecipeIngredientDtoType } from '../resources'

export type CreateRecipeQuery = Overwrite<
  z.infer<typeof CreateRecipeQuerySchema> & {
    recipeIngredients: (CreateRecipeIngredientQuery | RecipeIngredientDtoType)[]
  },
  { kind: 'CreateRecipeQuery' }
>

export type UpdateRecipeQuery = Overwrite<CreateRecipeQuery, { kind: 'UpdateRecipeQuery' }>
export type DeleteRecipeQuery = z.infer<typeof DeleteRecipeQuerySchema>
export type GetUserRecipesQuery = Overwrite<
  z.infer<typeof GetUserRecipesQuerySchema>,
  { kind: 'GetUserRecipesQuery' }
>
