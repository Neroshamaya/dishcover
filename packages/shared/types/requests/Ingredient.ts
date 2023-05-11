import { CreateIngredientSchema, DeleteIngredientSchema } from '../../schemas/requests/Ingredient'
import z from 'zod'

export type CreateIngredientQuery = z.infer<typeof CreateIngredientSchema>

export type UpdateIngredientQuery = Omit<CreateIngredientQuery, 'id'>

export type DeleteIngredientQuery = z.infer<typeof DeleteIngredientSchema>
