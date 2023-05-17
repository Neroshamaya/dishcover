import { UpdateRecipeQuery } from '@dishcover/shared/types/requests'
import { UpdateRecipeResponse } from '@dishcover/shared/types/responses'

import Recipe from '../models/Recipe'
import type UseCase from '../types/IUseCase'
import RecipeRepository from '../../application/repositories/RecipeRepository'
import { RecipeDtoType } from '@dishcover/shared/types/resources'
import { Ipresenter } from '@/domain/types/IPresenter'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

export type UpdateRecipeExecResponse = Recipe

export class UpdateRecipe implements UseCase<UpdateRecipeQuery, UpdateRecipeResponse> {
  constructor(
    private recipeRepository: IRecipeRepository,
    private presenter: Ipresenter<UpdateRecipeExecResponse, UpdateRecipeResponse>
  ) {}

  async execute(query: UpdateRecipeQuery) {
    const recipe = await this.recipeRepository.updateRecipe(query)
    return this.presenter.present(recipe)
  }
}
