import { RecipeSchema, baseRecipeSchema } from '../resources/Recipe'
import { RecipeIngredientSchema } from '../resources/RecipeIngredient'
import { UserSchema } from '../resources/User'
import { CreateRecipeIngredientSchema } from './RecipeIngredient'
import { ObjectId } from 'bson'
import z from 'zod'

const baseRequestRecipeSchema = baseRecipeSchema.extend({
  recipeIngredients: z.lazy(() =>
    CreateRecipeIngredientSchema.array().min(1, 'you need to add at least 1 ingredient')
  )
})

export const CreateRecipeQuerySchema = baseRequestRecipeSchema
export const GetUserRecipesQuerySchema = z.object({
  userId: z.string().refine((id) => ObjectId.isValid(id))
})

export const UpdateRecipeQuerySchema = RecipeSchema.extend({
  recipeIngredients: z
    .lazy(() =>
      CreateRecipeIngredientSchema.array().min(1, 'you need to add at least 1 ingredient')
    )
    .or(
      z.lazy(() => RecipeIngredientSchema.array().min(1, 'you need to add at least 1 ingredient'))
    )
})

export const DeleteRecipeQuerySchema = z.object({
  id: z.string().refine((id) => ObjectId.isValid(id))
})
