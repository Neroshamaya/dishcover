import type { CreateRecipeQuery } from '@dishcover/shared/types/requests'
import type { CreateRecipeResponse } from '@dishcover/shared/types/responses'

import Recipe from '../models/Recipe'
import type UseCase from '../types/IUseCase'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'
import { RecipeDtoType } from '@dishcover/shared/types/resources'
import { Ipresenter } from '@/domain/types/IPresenter'

export type CreateRecipeExecResponse = Recipe

export class CreateRecipe implements UseCase<CreateRecipeQuery, CreateRecipeResponse> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private presenter: Ipresenter<CreateRecipeExecResponse, CreateRecipeResponse>
  ) {}

  async execute(query: CreateRecipeQuery): Promise<RecipeDtoType> {
    return this.presenter.present(await this.recipeRepository.createRecipe(query))
  }
}
