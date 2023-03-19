
import { RetrieveCategories } from '../../domain/useCases/RetrieveCategories'
import type CategoryRepository from '../repositories/CategoryRepository'
import type JSONPresenter from '../presenters/JSONPresenter'

export default class ProductController {
    constructor(private categoryRepository: CategoryRepository, private jsonPresenter: JSONPresenter){}
    list(){
        const useCase = new RetrieveCategories(this.categoryRepository, this.jsonPresenter)
        return useCase.execute()
    }
}