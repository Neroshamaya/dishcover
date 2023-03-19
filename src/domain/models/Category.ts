import { z } from 'zod'
import { DomainModelInterface } from '../../../types/DomainModelInterface'
import { ObjectId } from 'bson'
import { Product, productSchema } from './Product'

const categorySchema = z.object({
    id: z.string().refine((id => ObjectId.isValid(id))),
    title: z.string(),
    products: z.array(productSchema).optional()
})

export type CategoryDtoType = z.infer<typeof categorySchema> & {
    products?: Product[]
}

export class Category implements DomainModelInterface<CategoryDtoType> {
    constructor(private categoryInfos: CategoryDtoType) {
        this.validate()
    }

    getDto(): CategoryDtoType {
        return {
            id: this.categoryInfos.id,
            title: this.categoryInfos.title,
            products: this.categoryInfos.products
        }
    }
    private validate() {
        categorySchema.parse(this.categoryInfos)
    }
}
