import { z } from 'zod'
import type UseCase from '../../../types/UseCaseInterface'
import type {PresenterInterface} from '../../../types/PresenterInterface'
import type { Product } from '../models/Product'
import ProductRepository from '../../application/repositories/ProductRepository'

export const retrieveProductsUseCaseQuerySchema = z.object({
    categoryid: z.string().uuid().optional(),
    limit: z.number().gte(1).lte(100).optional(),
    sort: z.literal('desc').or(z.literal('asc')).optional()
})
export type retrieveProductsUseCaseQueryInterface = z.infer<typeof retrieveProductsUseCaseQuerySchema>


export class RetrieveProducts<OutputType> implements UseCase<retrieveProductsUseCaseQueryInterface> {
    constructor(
        private productRepository:ProductRepository,
        private presenter: PresenterInterface<Product[], OutputType>
    ){}

    async execute(query: retrieveProductsUseCaseQueryInterface): Promise<OutputType> {
        const validQuery = retrieveProductsUseCaseQuerySchema.parse(query)
        const responses = await this.productRepository.find({
            where: {
                categoryId: validQuery.categoryid
            },
            take: validQuery.limit,
            orderBy: {
                createdAt: validQuery.sort
            },
            include: {
                category: {
                    select: {title: true}
                }
            }
        })
        return this.presenter.present(responses)
    }
}