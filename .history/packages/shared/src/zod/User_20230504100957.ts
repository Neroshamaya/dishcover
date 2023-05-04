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

export const UserCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
export type UserCredentialsDtoType = z.infer<typeof UserCredentialsSchema>

export type UserDtoType = z.infer<typeof UserSchema>
