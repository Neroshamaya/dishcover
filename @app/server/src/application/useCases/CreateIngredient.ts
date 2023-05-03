import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import { IngredientDtoType } from '@dishcover/shared'
import IngredientRepository from '../repositories/IngredientRepository'

export class CreateIngredient<OutputType> implements UseCase<IngredientDtoType> {
  constructor(
    private ingredientRepository: IngredientRepository,
    private presenter: IPresenter<IngredientDtoType, OutputType>
  ) {}

  async execute(newIngredient: IngredientDtoType) {
    const ingredient = await this.ingredientRepository.create(newIngredient)
    return this.presenter.present(ingredient.getDto())
  }
}
