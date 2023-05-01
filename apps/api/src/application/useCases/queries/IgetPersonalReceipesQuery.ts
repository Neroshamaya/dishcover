import { z } from 'zod'
import { ObjectId } from 'bson'

export const getPersonalReceipesQuerySchema = z.object({
    userId: z.string().refine((id => ObjectId.isValid(id)))
})
export type IgetPersonalReceipesQuery = z.infer<typeof getPersonalReceipesQuerySchema>