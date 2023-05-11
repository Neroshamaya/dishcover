import z from 'zod'
import { IngredientSchema } from '../resources/Ingredient'
import { UserDtoSchema } from '../resources/User'
import { ObjectId } from 'bson'

export const CreateIngredientSchema = IngredientSchema.extend({
  id: z.string().optional()
})

export const UpdateIngredientSchema = IngredientSchema

export const DeleteIngredientSchema = z.object({
  id: z.string().refine((id) => ObjectId.isValid(id))
})
