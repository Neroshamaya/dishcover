import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import type { IDeleteReceipeQuery } from './queries/IDeleteRecipeQuery'
import { RecipeDtoType } from '@dishcover/shared'
import ReceipeRepository from '../repositories/ReceipeRepository'

export class DeleteReceipe<OutputType> implements UseCase<IDeleteReceipeQuery> {
  constructor(
    private receipeRepository: ReceipeRepository,
    private presenter: IPresenter<RecipeDtoType, OutputType>
  ) {}

  async execute(query: IDeleteReceipeQuery): Promise<OutputType | void> {
    await this.receipeRepository.deleteReceipe(query.id)
  }
}
