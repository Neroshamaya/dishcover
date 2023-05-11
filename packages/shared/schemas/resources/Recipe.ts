import { z } from 'zod'
import { ObjectId } from 'bson'
import { UserSchema } from './User'
import { RecipeDtoType } from '../../types/resources/Recipe'
import { RecipeIngredientSchema } from './RecipeIngredient'

export const baseRecipeSchema = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  label: z.string().nonempty('a value is required'),
  description: z.string(),
  authorId: z.string().refine((id) => ObjectId.isValid(id)),
  created: z.string().datetime({ offset: true }).pipe(z.coerce.date()).optional(),
  updated: z.string().datetime({ offset: true }).pipe(z.coerce.date()).optional(),
  image: z.string().url().optional().nullable().or(z.string().max(0))
})

export const RecipeSchema = baseRecipeSchema.extend({
  recipeIngredients: z.lazy(() =>
    RecipeIngredientSchema.array().min(1, 'you need to add at least 1 ingredient')
  ),
  author: z.lazy(() => UserSchema).optional()
})
