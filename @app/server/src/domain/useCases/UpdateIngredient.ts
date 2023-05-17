import { UpdateIngredientQuery } from '@dishcover/shared/types/requests'
import { UpdateIngredientResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IIngredientRepository from '@/domain/types/repository/IIngredientRepository'

import Ingredient from '../models/Ingredient'
import type UseCase from '../types/IUseCase'

export type UpdateIngredientExecResponse = Ingredient

export class UpdateIngredient implements UseCase<UpdateIngredientQuery, UpdateIngredientResponse> {
  constructor(
    private ingredientRepository: IIngredientRepository,
    private presenter: Ipresenter<UpdateIngredientExecResponse, UpdateIngredientResponse>
  ) {}

  async execute(query: UpdateIngredientQuery): Promise<UpdateIngredientResponse> {
    return this.presenter.present(await this.ingredientRepository.update(query))
  }
}
