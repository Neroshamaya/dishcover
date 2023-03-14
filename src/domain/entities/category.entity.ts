import { z } from 'zod'

const categorySchema = z.object({
    id: z.string().uuid(),
    title: z.string()
});

type CategoryInfoType = z.infer<typeof categorySchema>

export class Category {
    constructor(private categoryInfos: CategoryInfoType) {
        this.validate()
    }

    getDto(): CategoryInfoType {
        return {
            id: this.categoryInfos.id,
            title: this.categoryInfos.title
        }
    }
    validate() {
        categorySchema.parse(this.categoryInfos)
    }
}
