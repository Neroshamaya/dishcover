import { z } from 'zod'
import {ObjectId} from 'bson'
export const deleteReceipeQuerySchema = z.object({
    id: z.string().refine((id => ObjectId.isValid(id))),
})
export type IDeleteReceipeQuery = z.infer<typeof deleteReceipeQuerySchema>