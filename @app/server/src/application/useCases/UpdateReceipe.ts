import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import type { IUpdateReceipeQuery } from './queries/IUpdateRecipeQuery'
import { Recipe } from '../../domain/models/Recipe'
import { RecipeDtoType } from '@dishcover/shared'
import ReceipeRepository from '../repositories/ReceipeRepository'

export class UpdateReceipe<OutputType> implements UseCase<IUpdateReceipeQuery> {
  constructor(
    private receipeRepository: ReceipeRepository,
    private presenter: IPresenter<RecipeDtoType, OutputType>
  ) {}

  async execute(query: RecipeDtoType): Promise<OutputType> {
    const updatedReceipe = new Recipe(query)
    const receipe = await this.receipeRepository.updateReceipe(updatedReceipe)
    return this.presenter.present(receipe.getDto())
  }
}
