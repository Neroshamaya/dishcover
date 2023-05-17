import type { GetAllRecipesQuery } from '@dishcover/shared/types/requests'
import type { GetRecipesResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

import Recipe from '../models/Recipe'
import type UseCase from '../types/IUseCase'

export type GetAllRecipesResponse = Recipe[]

export class GetAllRecipes implements UseCase<GetAllRecipesQuery, GetRecipesResponse> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private presenter: Ipresenter<GetAllRecipesResponse, GetRecipesResponse>
  ) {}

  async execute(query: GetAllRecipesQuery): Promise<GetRecipesResponse> {
    return this.presenter.present(await this.recipeRepository.retrieveAll(query))
  }
}
