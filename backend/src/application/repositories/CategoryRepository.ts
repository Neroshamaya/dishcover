import { Category } from '../../domain/models/Category'
import type { PrismaClient, Prisma } from '@prisma/client'

export default class CategoryRepository {
    constructor(private prismaClient: PrismaClient){}
    async find(query: Prisma.CategoryFindManyArgs): Promise<Category[]> {
        const result = await this.prismaClient.category.findMany(query)
        return result.map( r => new Category(r) )
    } 
}