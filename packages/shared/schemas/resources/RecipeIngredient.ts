import { ZodSchema, z } from 'zod'
import { ObjectId } from 'bson'
import { IngredientSchema } from './Ingredient'
import { RecipeIngredientDtoType } from '../../types/resources/RecipeIngredient'

export const baseRecipeIngredientSchema = z.object({
  id: z.string().refine((id) => ObjectId.isValid(id)),
  ingredientId: z.string().refine((id) => ObjectId.isValid(id)),
  quantity: z.number().min(1),
  recipeId: z.string().refine((id) => ObjectId.isValid(id))
})

export const RecipeIngredientSchema: z.ZodType<RecipeIngredientDtoType> =
  baseRecipeIngredientSchema.extend({
    details: z
      .lazy(() => IngredientSchema)
      .optional()
      .nullable()
  })
