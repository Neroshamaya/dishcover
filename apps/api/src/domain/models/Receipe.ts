import { z } from 'zod'
import { IDomainModel } from '../types/IDomainModel'
import { ObjectId } from 'bson'
import { ingredientSchema, IngredientDtoType } from './Ingredient'
import { UserDtoType, userSchema } from './User'

const baseReceipeSchema = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  label: z.string().nonempty('a value is required'),
  description: z.string(),
  authorId: z.string().refine((id) => ObjectId.isValid(id)),
  created: z.date().optional().nullable(),
  updated: z.date().optional().nullable(),
  image: z.string().url().optional().nullable().or(z.string().max(0))
})
const receipeIngredientSchema = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional(),
  ingredientId: z.string().refine((id) => ObjectId.isValid(id)),
  quantity: z.number().min(1),
  receipeId: z
    .string()
    .refine((id) => ObjectId.isValid(id))
    .optional()
    .nullable()
})
export type ReceipeIngredientDtoType = z.infer<typeof receipeIngredientSchema>

export type ReceipeDtoType = z.infer<typeof baseReceipeSchema> & {
  ingredients: ReceipeIngredientDtoType[]
  author?: UserDtoType | null
}

export const receipeSchema: z.ZodType<ReceipeDtoType> = baseReceipeSchema.extend({
  ingredients: z.lazy(() =>
    receipeIngredientSchema.array().min(1, 'you need to add at least 1 ingredient')
  ),
  author: z.lazy(() => userSchema).optional()
})

export class Receipe implements IDomainModel<ReceipeDtoType> {
  constructor(private readonly receipeInfos: ReceipeDtoType) {
    this.validate()
  }

  getDto(): ReceipeDtoType {
    return {
      id: this.receipeInfos.id,
      label: this.receipeInfos.label,
      ingredients: this.receipeInfos.ingredients || [],
      description: this.receipeInfos.description,
      author: this.receipeInfos.author,
      authorId: this.receipeInfos.authorId,
      created: this.receipeInfos.created,
      updated: this.receipeInfos.updated,
      image: this.receipeInfos.image
    }
  }
  validate() {
    receipeSchema.parse(this.receipeInfos)
  }
}
