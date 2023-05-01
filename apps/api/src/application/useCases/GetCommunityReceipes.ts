import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import type { IgetPersonalReceipesQuery } from './queries/IgetPersonalReceipesQuery'
import { ReceipeDtoType } from '../../domain/models/Receipe'
import ReceipeRepository from '../repositories/ReceipeRepository'

export class GetCommunityReceipes<OutputType> implements UseCase<IgetPersonalReceipesQuery> {
  constructor(
    private receipeRepository: ReceipeRepository,
    private presenter: IPresenter<ReceipeDtoType[], OutputType>
  ) {}

  async execute(query: { userId: string }): Promise<OutputType> {
    const { userId } = query
    const receipes = await this.receipeRepository.retrieveAllExceptFromUser(userId)
    return this.presenter.present(receipes.map((r) => r.getDto()))
  }
}
