import { z } from 'zod'
import { DomainModelInterface } from '../../../types/DomainModelInterface'

const categorySchema = z.object({
    id: z.string().uuid(),
    title: z.string()
})

export type CategoryDtoType = z.infer<typeof categorySchema>

export class Category implements DomainModelInterface<CategoryDtoType> {
    constructor(private categoryInfos: CategoryDtoType) {
        this.validate()
    }

    getDto(): CategoryDtoType {
        return {
            id: this.categoryInfos.id,
            title: this.categoryInfos.title
        }
    }
    private validate() {
        categorySchema.parse(this.categoryInfos)
    }
}
