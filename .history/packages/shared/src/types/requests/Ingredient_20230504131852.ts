import { IngredientSchema } from '../../zod/Ingredient'
import z from 'zod'

export const CreateIngredientSchema = z.object(IngredientSchema.omit({ id: true }))

export type CreateIngredientQuery = z.infer<typeof CreateIngredientSchema>
