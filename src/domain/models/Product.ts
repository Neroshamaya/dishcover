import { z } from 'zod'
import { DomainModelInterface} from '../../../types/DomainModelInterface'

export const productSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string(),
    price: z.number(),
    image: z.string().url(),
    description: z.string(),
    categoryId: z.string().uuid(),
    createdAt: z.date().optional()
})

export type ProductDtoType = z.infer<typeof productSchema>

export class Product implements DomainModelInterface<ProductDtoType> {
    constructor(private productInfos: ProductDtoType) {
        this.validate()
    }

    getDto(): ProductDtoType {
        return {
            id: this.productInfos.id,
            title: this.productInfos.title,
            price: this.productInfos.price,
            image: this.productInfos.image,
            description: this.productInfos.description,
            categoryId:  this.productInfos.categoryId,
            createdAt: this.productInfos.createdAt
        }
    }
    validate() {
        productSchema.parse(this.productInfos)
    }
}
