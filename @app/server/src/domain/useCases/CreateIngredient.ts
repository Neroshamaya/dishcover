import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { CreateIngredientResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IIngredientRepository from '@/domain/types/repository/IIngredientRepository'

import Ingredient from '../models/Ingredient'
import type UseCase from '../types/IUseCase'

export class CreateIngredient implements UseCase<CreateIngredientQuery, CreateIngredientResponse> {
  constructor(
    private ingredientRepository: IIngredientRepository,
    private presenter: Ipresenter<Ingredient, CreateIngredientResponse>
  ) {}

  async execute(query: CreateIngredientQuery): Promise<CreateIngredientResponse> {
    return this.presenter.present(await this.ingredientRepository.create(query))
  }
}
