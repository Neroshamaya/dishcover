import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import { IngredientDtoType } from '@dishcover/shared'
import IngredientRepository from '../repositories/IngredientRepository'

export class GetIngredients<OutputType> implements UseCase<void> {
  constructor(
    private ingredientRepository: IngredientRepository,
    private presenter: IPresenter<IngredientDtoType[], OutputType>
  ) {}

  async execute(): Promise<OutputType> {
    const ingredients = await this.ingredientRepository.getAll()
    return this.presenter.present(ingredients.map((i) => i.getDto()))
  }
}
