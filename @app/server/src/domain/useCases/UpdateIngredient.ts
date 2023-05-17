import { UpdateIngredientQuery } from '@dishcover/shared/types/requests'
import { UpdateIngredientResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IIngredientRepository from '@/domain/types/repository/IIngredientRepository'

import Ingredient from '../models/Ingredient'
import type UseCase from '../types/IUseCase'

export class UpdateIngredient implements UseCase<UpdateIngredientQuery> {
  constructor(
    private ingredientRepository: IIngredientRepository,
    private presenter: Ipresenter<Ingredient>
  ) {}

  async execute(query: UpdateIngredientQuery) {
    return this.presenter.present(await this.ingredientRepository.update(query))
  }
}
