import { z } from 'zod'
import type UseCase from '../../../types/UseCaseInterface'
import type {PresenterInterface} from '../../../types/PresenterInterface'
import type ProductRepository from '../repositories/ProductRepository'
import type { Product } from '../../domain/models/Product'

export const retrieveProductsUseCaseQuerySchema = z.object({
    categoryid: z.string().uuid(),
    limit: z.number().gte(1).lte(100),
    sort: z.literal('desc').or(z.literal('asc'))
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
            limit: validQuery.limit,
            orderBy: {
                createdAt: validQuery.sort
            }
        })

        return this.presenter.present(responses)
    }
}