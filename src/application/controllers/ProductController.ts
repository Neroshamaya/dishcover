import {Request} from 'express'
import { RetrieveProducts, retrieveProductsUseCaseQuerySchema } from '../useCases/RetrieveProducts'
import type ProductRepository from '../repositories/ProductRepository'
import type JSONProductListPresenter from '../presenters/JSONProductListPresenter'
import container from '../services/dependencyInjectionService'

export default class ProductController {
    constructor(private productRepository: ProductRepository, private jsonProductListPresenter: JSONProductListPresenter){
        this.productRepository  = container.productRepository
        this.jsonProductListPresenter = container.jsonProductListPresenter
    }
    list(request: Request){
        const validRequest = retrieveProductsUseCaseQuerySchema.parse(request)
        const useCase = new RetrieveProducts(this.productRepository, this.jsonProductListPresenter)
        return useCase.execute(validRequest)
    }
}