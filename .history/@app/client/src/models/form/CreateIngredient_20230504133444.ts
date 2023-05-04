import { z } from 'zod'
import { CreateIngredientSchema } from '@dishcover/shared'

export const SignUpFormSchema = CreateIngredientSchema

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>
