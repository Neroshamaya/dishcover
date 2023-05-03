import { z } from 'zod'
import { RecipeSchema } from '@dishcover/shared'
export const UpdateRecipeQuerySchema = RecipeSchema
export type IUpdateReceipeQuery = z.infer<typeof UpdateRecipeQuerySchema>
