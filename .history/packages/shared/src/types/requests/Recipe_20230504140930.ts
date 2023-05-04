import { RecipeSchema } from '../../zod/Recipe'
import z from 'zod'

export const CreateRecipeSchema = RecipeSchema

export type CreateRecipeQuery = z.infer<typeof CreateRecipeSchema>
