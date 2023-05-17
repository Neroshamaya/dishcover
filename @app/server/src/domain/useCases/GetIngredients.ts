import { IngredientDtoType } from '@dishcover/shared/types/resources'
import { GetIngredientsResponse } from '@dishcover/shared/types/responses'
import type UseCase from '../types/IUseCase'
import IngredientRepository from '../../application/repositories/IngredientRepository'
import IIngredientRepository from '../types/repository/IIngredientRepository'
import { Ipresenter } from '../types/IPresenter'
import Ingredient from '@/domain/models/Ingredient'

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
