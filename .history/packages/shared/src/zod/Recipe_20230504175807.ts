import { z } from 'zod'
import { ObjectId } from 'bson'
import { UserDtoType, UserSchema } from './User'
import { IngredientDtoType, IngredientSchema } from './Ingredient'

const baseRecipeSchema = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  label: z.string().nonempty('a value is required'),
  description: z.string(),
  authorId: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  created: z.date().optional().nullable(),
  updated: z.date().optional().nullable(),
  image: z.string().url().optional().nullable().or(z.string().max(0))
})

export type RecipeDtoType = z.infer<typeof baseRecipeSchema> & {
  ingredients?: RecipeIngredientDtoType[]
  author?: UserDtoType | null
}

export const RecipeSchema: z.ZodType<RecipeDtoType> = baseRecipeSchema.extend({
  ingredients: z.lazy(() =>
    RecipeIngredientSchema.array().min(1, 'you need to add at least 1 ingredient').optional()
  ),
  author: z.lazy(() => UserSchema).optional()
})

const baseRecipeIngredientSchema = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  ingredientId: z.string().refine((id) => ObjectId.isValid(id)),
  quantity: z.number().min(1),
  recipeId: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional()
    .nullable()
})
export type RecipeIngredientDtoType = z.infer<typeof baseRecipeIngredientSchema> & {
  details?: IngredientDtoType | null
}

export const RecipeIngredientSchema: z.ZodType<RecipeIngredientDtoType> =
  baseRecipeIngredientSchema.extend({
    details: z
      .lazy(() => IngredientSchema)
      .optional()
      .nullable()
  })
