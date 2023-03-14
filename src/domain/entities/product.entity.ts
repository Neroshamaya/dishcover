import { z } from 'zod'
const productSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    price: z.number(),
    image: z.string().url(),
    description: z.string()
});

type ProductInfoType = z.infer<typeof productSchema>

export class Product {
    constructor(private productInfos: ProductInfoType) {
        this.validate()
    }

    getDto(): ProductInfoType {
        return {
            id: this.productInfos.id,
            title: this.productInfos.title,
            price: this.productInfos.price,
            image: this.productInfos.image,
            description: this.productInfos.description
        }
    }
    validate() {
        productSchema.parse(this.productInfos)
    }
}
