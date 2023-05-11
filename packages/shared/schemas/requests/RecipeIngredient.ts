import z from 'zod'
import { ObjectId } from 'bson'
import { baseRecipeIngredientSchema } from '../resources/RecipeIngredient'

export const CreateRecipeIngredientSchema = baseRecipeIngredientSchema.extend({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  recipeId: z.string().optional()
})
