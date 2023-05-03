import { z } from 'zod'
export const authenticateUserQuerySchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty()
})
export type IAuthenticateUserQuery = z.infer<typeof authenticateUserQuerySchema>
