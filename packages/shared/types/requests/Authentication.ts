import { z } from 'zod'
import { RegisterQuerySchema, LoginQuerySchema } from '../../schemas/requests/Authentication'

export type RegisterQuery = z.infer<typeof RegisterQuerySchema>

export type LoginQuery = z.infer<typeof LoginQuerySchema>
