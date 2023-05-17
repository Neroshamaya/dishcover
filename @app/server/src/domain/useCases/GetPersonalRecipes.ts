import type { GetUserRecipesQuery } from '@dishcover/shared/types/requests'
import type { GetRecipesResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

import Recipe from '../models/Recipe'
import type UseCase from '../types/IUseCase'

export class GetPersonalRecipes implements UseCase<GetUserRecipesQuery> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private presenter: Ipresenter<Recipe[]>
  ) {}

  async execute(query: GetUserRecipesQuery) {
    return this.presenter.present(await this.recipeRepository.retrieveAll(query))
  }
}
