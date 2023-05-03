import { z } from 'zod'
import { IngredientSchema } from '@dishcover/shared'

export type ICreateIngredientQuery = z.infer<typeof IngredientSchema>
