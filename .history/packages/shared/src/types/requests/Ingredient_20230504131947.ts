import { IngredientSchema } from '../../zod/Ingredient'
import z from 'zod'

export const CreateIngredientSchema = IngredientSchema

export type CreateIngredientQuery = z.infer<typeof CreateIngredientSchema>
