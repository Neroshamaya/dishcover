import { Product } from '../../domain/models/Product'
import type { PrismaClient, Prisma } from '@prisma/client'

export default class ProductRepository {
    constructor(private prismaClient: PrismaClient){}
    async find(query: Prisma.ProductFindManyArgs): Promise<Product[]> {
        const result = await this.prismaClient.product.findMany(query)
        return result.map( r => new Product(r) )
    } 
}