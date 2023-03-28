import { z } from 'zod'
import { DomainModelInterface} from '../../../types/DomainModelInterface'
import { ObjectId } from 'bson'
import type  { CategoryDtoType } from './Category'

export const productSchema = z.object({
    id: z.string().refine((id => ObjectId.isValid(id))),
    title: z.string(),
    price: z.number(),
    image: z.string().url(),
    description: z.string(),
    categoryId: z.string().refine((id => ObjectId.isValid(id))),
    categoryTitle: z.string().optional(),
    createdAt: z.date().optional(),
})

type BaseProductDtoType = z.infer<typeof productSchema>

export type ProductInclude = {
    category?: {
        [Property in keyof Omit<CategoryDtoType, 'id'>]?: CategoryDtoType[Property]
    }
}

export type ProductDtoType = BaseProductDtoType & ProductInclude

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
            categoryTitle:  this.productInfos.category?.title,
            createdAt: this.productInfos.createdAt
        }
    }
    validate() {
        productSchema.parse(this.productInfos)
    }
}
