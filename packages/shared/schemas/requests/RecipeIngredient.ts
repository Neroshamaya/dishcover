import z, { ZodSchema } from 'zod'
import { ObjectId } from 'bson'
import { baseRecipeIngredientSchema } from '../resources/RecipeIngredient'
import { CreateRecipeIngredientQuery } from '../../types/requests'
export const CreateRecipeIngredientSchema: ZodSchema<
  CreateRecipeIngredientQuery,
  z.ZodTypeDef,
  CreateRecipeIngredientQuery
> = baseRecipeIngredientSchema.extend({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  recipeId: z.string()
})
