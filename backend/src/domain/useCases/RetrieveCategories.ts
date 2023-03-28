import type UseCase from '../../../types/UseCaseInterface'
import type {PresenterInterface} from '../../../types/PresenterInterface'
import CategoryRepository from '../../application/repositories/CategoryRepository'
import { DomainModelInterface } from '../../../types/DomainModelInterface'
import { CategoryDtoType } from '../models/Category'


export class RetrieveCategories<OutputType> implements UseCase<Record<string,string>> {
    constructor(
        private categoryRepository:CategoryRepository,
        private presenter: PresenterInterface<DomainModelInterface<CategoryDtoType>[], OutputType>
    ){}

    async execute(): Promise<OutputType> {
        const responses = await this.categoryRepository.find({
            include: {
                products: true
            }
        })
        return this.presenter.present(responses)
    }
}