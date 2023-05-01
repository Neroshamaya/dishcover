import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import type { IUpdateReceipeQuery } from './queries/IUpdateReceipeQuery'
import { Receipe, ReceipeDtoType } from '../../domain/models/Receipe'
import ReceipeRepository from '../repositories/ReceipeRepository'

export class UpdateReceipe<OutputType> implements UseCase<IUpdateReceipeQuery> {
  constructor(
    private receipeRepository: ReceipeRepository,
    private presenter: IPresenter<ReceipeDtoType, OutputType>
  ) {}

  async execute(query: ReceipeDtoType): Promise<OutputType> {
    const updatedReceipe = new Receipe(query)
    const receipe = await this.receipeRepository.updateReceipe(updatedReceipe)
    return this.presenter.present(receipe.getDto())
  }
}
