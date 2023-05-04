import { IngredientSchema } from '../../zod/Ingredient'
import z from 'zod'

export const CreateIngredientSchema = Omit<IngredientSchema, 'id'>

export type CreateIngredientQuery = z.infer<typeof CreateIngredientSchema>
