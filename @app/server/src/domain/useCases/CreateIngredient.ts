import Ingredient from '../models/Ingredient'
import type UseCase from '../types/IUseCase'
import IIngredientRepository from '@/domain/types/repository/IIngredientRepository'
import { IngredientDtoType } from '@dishcover/shared/types/resources'
import { Ipresenter } from '@/domain/types/IPresenter'
import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { CreateIngredientResponse } from '@dishcover/shared/types/responses'

export class CreateIngredient implements UseCase<CreateIngredientQuery, CreateIngredientResponse> {
  constructor(
    private ingredientRepository: IIngredientRepository,
    private presenter: Ipresenter<Ingredient, CreateIngredientResponse>
  ) {}

  async execute(query: CreateIngredientQuery): Promise<CreateIngredientResponse> {
    return this.presenter.present(await this.ingredientRepository.create(query))
  }
}
