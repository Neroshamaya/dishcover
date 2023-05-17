import {
  CreateRecipeQuerySchema,
  DeleteRecipeQuerySchema,
  UpdateRecipeQuerySchema
} from '../../schemas/requests/Recipe'
import { Overwrite } from 'utility-types'

import z from 'zod'
import { RecipeIngredientSchema } from '../../schemas/resources/RecipeIngredient'
import { CreateRecipeIngredientQuery } from './RecipeIngredient'
import { GetUserRecipesQuerySchema } from '../../schemas/requests/Recipe'
import { RecipeIngredientDtoType } from '../resources'

export type CreateRecipeQuery = Omit<
  z.infer<typeof CreateRecipeQuerySchema> & {
    recipeIngredients: CreateRecipeIngredientQuery[]
  },
  'updated' | 'created' | 'id'
>

export type UpdateRecipeQuery = z.infer<typeof UpdateRecipeQuerySchema>
export type DeleteRecipeQuery = z.infer<typeof DeleteRecipeQuerySchema>
export type GetAllRecipesQuery = Record<string, never>
export type GetUserRecipesQuery = z.infer<typeof GetUserRecipesQuerySchema>
