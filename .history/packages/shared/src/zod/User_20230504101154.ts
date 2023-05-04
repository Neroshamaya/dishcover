import { z } from 'zod'
import { ObjectId } from 'bson'

export const UserSchema = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  email: z.string().email(),
  salt: z.string(),
  password: z.string(),
  created: z.date().optional().nullable(),
  updated: z.date().optional().nullable()
})

export type UserDtoType = z.infer<typeof UserSchema>
