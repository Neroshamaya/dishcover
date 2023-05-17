import { GetIngredientsResponse } from '@dishcover/shared/types/responses'

import Ingredient from '@/domain/models/Ingredient'

import { Ipresenter } from '../types/IPresenter'
import type UseCase from '../types/IUseCase'
import IIngredientRepository from '../types/repository/IIngredientRepository'

export class GetIngredients implements UseCase {
  constructor(
    private ingredientRepository: IIngredientRepository,
    private presenter: Ipresenter<Ingredient[]>
  ) {}

  async execute() {
    const ingredients = await this.ingredientRepository.getAll()
    return this.presenter.present(ingredients)
  }
}
