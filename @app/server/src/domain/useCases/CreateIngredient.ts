import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { CreateIngredientResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IIngredientRepository from '@/domain/types/repository/IIngredientRepository'

import Ingredient from '../models/Ingredient'
import type UseCase from '../types/IUseCase'

export class CreateIngredient implements UseCase<CreateIngredientQuery> {
  constructor(
    private ingredientRepository: IIngredientRepository,
    private presenter: Ipresenter<Ingredient>
  ) {}

  async execute(query: CreateIngredientQuery) {
    return this.presenter.present(await this.ingredientRepository.create(query))
  }
}
