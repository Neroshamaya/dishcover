import {Request} from 'express'
import { RetrieveProducts, retrieveProductsUseCaseQuerySchema } from '../../domain/useCases/RetrieveProducts'
import type ProductRepository from '../repositories/ProductRepository'
import type JSONProductListPresenter from '../presenters/JSONProductListPresenter'

export default class ProductController {
    constructor(private productRepository: ProductRepository, private jsonProductListPresenter: JSONProductListPresenter){}
    list(request: Request){
        const validRequest = retrieveProductsUseCaseQuerySchema.parse(request.params)
        const useCase = new RetrieveProducts(this.productRepository, this.jsonProductListPresenter)
        return useCase.execute(validRequest)
    }
}