import { UserDtoType } from '../../zod/User'
import z from 'zod'

export const LoginQuerySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type LoginQuery = z.infer<typeof LoginQuerySchema>
