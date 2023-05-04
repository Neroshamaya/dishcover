import { RecipeSchema } from '../../zod/Recipe'
import z from 'zod'

export const CreateRecipeSchema = RecipeSchema.and(
  z.object({
    token: z.string()
  })
)

export type CreateRecipeQuery = z.infer<typeof CreateRecipeSchema>
