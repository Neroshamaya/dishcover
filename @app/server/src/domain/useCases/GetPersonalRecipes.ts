import type { GetUserRecipesQuery } from '@dishcover/shared/types/requests'
import type { GetRecipesResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

import Recipe from '../models/Recipe'
import type UseCase from '../types/IUseCase'

export type GetPersonalRecipesResponse = Recipe[]

export class GetPersonalRecipes implements UseCase<GetUserRecipesQuery, GetRecipesResponse> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private presenter: Ipresenter<GetPersonalRecipesResponse, GetRecipesResponse>
  ) {}

  async execute(query: GetUserRecipesQuery): Promise<GetRecipesResponse> {
    return this.presenter.present(await this.recipeRepository.retrieveAll(query))
  }
}
