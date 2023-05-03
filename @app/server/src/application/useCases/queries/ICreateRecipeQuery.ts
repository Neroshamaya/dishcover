import { z } from 'zod'
import { RecipeSchema } from '@dishcover/shared'
export const CreateReceipeQuerySchema = RecipeSchema
export type ICreateReceipeQuery = z.infer<typeof CreateReceipeQuerySchema>
