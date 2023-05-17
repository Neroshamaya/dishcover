import { CreateIngredientSchema, DeleteIngredientSchema } from '../../schemas/requests/Ingredient'
import z from 'zod'

export type CreateIngredientQuery = Omit<z.infer<typeof CreateIngredientSchema>, 'id'>

export type UpdateIngredientQuery = z.infer<typeof CreateIngredientSchema>

export type DeleteIngredientQuery = z.infer<typeof DeleteIngredientSchema>
