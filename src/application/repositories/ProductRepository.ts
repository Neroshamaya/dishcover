import type { ReadRepositoryInterface, FindQueryInterface } from '../../../types/RepositoryInterface'
import { Product } from '../../domain/models/Product'
import type {ProductDtoType} from '../../domain/models/Product'
import type { PrismaClient } from '@prisma/client'

export default class ProductRepository implements ReadRepositoryInterface<Product, ProductDtoType>{
    constructor(private prismaClient: PrismaClient){}
    async find(query: FindQueryInterface<ProductDtoType>): Promise<Product[]> {
        const result = await this.prismaClient.product.findMany({
            where: query.where,
            orderBy: query.orderBy,
            take: query.limit 
        })
        return result.map( r => new Product(r) )
    } 
}