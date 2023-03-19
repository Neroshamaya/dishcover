import { IProcessor } from '@getbigger-io/prisma-fixtures-cli'
import { Product, Category, Prisma } from '@prisma/client'

export default class ProductProcessor implements IProcessor<Product> {
    preProcess(name: string, object: Product & {category: Category|Prisma.CategoryCreateNestedOneWithoutProductInput}): any {
        const category = object.category as Category
        object.category = {
            connect: {
                id: category?.id
            }
        }
        return object
    }
}