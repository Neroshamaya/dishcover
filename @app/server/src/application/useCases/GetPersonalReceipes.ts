import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import type { IgetPersonalReceipesQuery } from './queries/IGetPersonalRecipesQuery'
import { RecipeDtoType } from '@dishcover/shared'
import ReceipeRepository from '../repositories/ReceipeRepository'

export class GetPersonalReceipes<OutputType> implements UseCase<IgetPersonalReceipesQuery> {
  constructor(
    private receipeRepository: ReceipeRepository,
    private presenter: IPresenter<RecipeDtoType[], OutputType>
  ) {}

  async execute(query: { userId: string }): Promise<OutputType> {
    const { userId } = query
    const receipes = await this.receipeRepository.retrieveAllFromUser(userId)
    return this.presenter.present(receipes.map((r) => r.getDto()))
  }
}
