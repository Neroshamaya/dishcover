import { z } from 'zod'
import { ObjectId } from 'bson'

export const IngredientSchema = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  label: z.string().nonempty(),
  description: z.string().nullable().optional(),
  iconLink: z.string().url().optional().nullable(),
  authorId: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional()
    .nullable()
})

export type IngredientDtoType = z.infer<typeof IngredientSchema>
