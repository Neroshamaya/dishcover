import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import type { ICreateReceipeQuery } from './queries/ICreateReceipeQuery'
import { Receipe, ReceipeDtoType } from '../../domain/models/Receipe'
import ReceipeRepository from '../repositories/ReceipeRepository'

export class CreateReceipe<OutputType> implements UseCase<ICreateReceipeQuery> {
  constructor(
    private receipeRepository: ReceipeRepository,
    private presenter: IPresenter<ReceipeDtoType, OutputType>
  ) {}

  async execute(query: ReceipeDtoType): Promise<OutputType> {
    const receipe = new Receipe(query)
    const createdReceipe = await this.receipeRepository.createReceipe(receipe)
    return this.presenter.present(createdReceipe.getDto())
  }
}
