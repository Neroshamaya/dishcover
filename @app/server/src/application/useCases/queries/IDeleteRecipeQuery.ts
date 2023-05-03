import { z } from 'zod'
import { ObjectId } from 'bson'
export const DeleteRecipeQuerySchema = z.object({
  id: z.string().refine((id) => ObjectId.isValid(id))
})
export type IDeleteReceipeQuery = z.infer<typeof DeleteRecipeQuerySchema>
