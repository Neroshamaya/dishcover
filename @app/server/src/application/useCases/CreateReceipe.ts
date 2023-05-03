import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import type { ICreateReceipeQuery } from './queries/ICreateRecipeQuery'
import { RecipeDtoType } from '@dishcover/shared'
import { Recipe } from '../../domain/models/Recipe'
import ReceipeRepository from '../repositories/ReceipeRepository'

export class CreateReceipe<OutputType> implements UseCase<ICreateReceipeQuery> {
  constructor(
    private receipeRepository: ReceipeRepository,
    private presenter: IPresenter<RecipeDtoType, OutputType>
  ) {}

  async execute(query: RecipeDtoType): Promise<OutputType> {
    const receipe = new Recipe(query)
    const createdReceipe = await this.receipeRepository.createReceipe(receipe)
    return this.presenter.present(createdReceipe.getDto())
  }
}
