import { GetIngredientsResponse } from '@dishcover/shared/types/responses'

import Ingredient from '@/domain/models/Ingredient'

import { Ipresenter } from '../types/IPresenter'
import type UseCase from '../types/IUseCase'
import IIngredientRepository from '../types/repository/IIngredientRepository'

export type GetIngredientsExecResponse = Ingredient[]

export class GetIngredients implements UseCase<void, GetIngredientsResponse> {
  constructor(
    private ingredientRepository: IIngredientRepository,
    private presenter: Ipresenter<GetIngredientsExecResponse, GetIngredientsResponse>
  ) {}

  async execute() {
    const ingredients = await this.ingredientRepository.getAll()
    return this.presenter.present(ingredients)
  }
}
