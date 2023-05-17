import type { GetAllRecipesQuery } from '@dishcover/shared/types/requests'
import type { GetRecipesResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

import Recipe from '../models/Recipe'
import type UseCase from '../types/IUseCase'

export class GetAllRecipes implements UseCase<GetAllRecipesQuery> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private presenter: Ipresenter<Recipe[]>
  ) {}

  async execute(query: GetAllRecipesQuery) {
    return this.presenter.present(await this.recipeRepository.retrieveAll(query))
  }
}
