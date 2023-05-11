import { z } from 'zod'
import { ObjectId } from 'bson'
import { UserSchema } from './User'

export const IngredientSchema = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  label: z.string().nonempty(),
  description: z.string().nullable().optional(),
  iconLink: z.string().url().optional().nullable(),
  authorId: z.string().refine((id) => ObjectId.isValid(id)),
  author: z.lazy(() => UserSchema).optional()
})
