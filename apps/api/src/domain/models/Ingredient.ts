import { z } from 'zod'
import { IDomainModel} from '../types/IDomainModel'
import { ObjectId } from 'bson'
import { ReceipeDtoType, receipeSchema } from './Receipe'

const baseIngredientSchema = z.object({
    id: z.string().refine((id => ObjectId.isValid(id))).optional(),
    label: z.string().nonempty(),
    description: z.string().nullable().optional(),
    iconLink: z.string().url().optional().nullable(),
    receipesIds: z.array(z.string().refine((id => ObjectId.isValid(id)))).optional(),
})
  
export type IngredientDtoType = z.infer<typeof baseIngredientSchema> & {
    receipes?: ReceipeDtoType[];
  };
  
export const ingredientSchema: z.ZodType<IngredientDtoType> = baseIngredientSchema.extend({
    receipes: z.lazy(() => receipeSchema.array()).optional(),
})

export class Ingredient implements IDomainModel<IngredientDtoType> {
    constructor(private readonly ingredientInfos: IngredientDtoType) {
        this.validate()
    }

    getDto(): IngredientDtoType {
        return {
            id: this.ingredientInfos.id,
            label: this.ingredientInfos.label,
            description: this.ingredientInfos.description,
            receipes: this.ingredientInfos.receipes,
            iconLink: this.ingredientInfos.iconLink
        }
    }
    validate() {
        ingredientSchema.parse(this.ingredientInfos)
    }
}
