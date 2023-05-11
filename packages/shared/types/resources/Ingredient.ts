import z from 'zod'
import { IngredientSchema } from '../../schemas/resources/Ingredient'

export type IngredientDtoType = z.infer<typeof IngredientSchema>
