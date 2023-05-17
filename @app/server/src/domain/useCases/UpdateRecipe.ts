import { UpdateRecipeQuery } from '@dishcover/shared/types/requests'
import { UpdateRecipeResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

import Recipe from '../models/Recipe'
import type UseCase from '../types/IUseCase'

export class UpdateRecipe implements UseCase<UpdateRecipeQuery> {
  constructor(private recipeRepository: IRecipeRepository, private presenter: Ipresenter<Recipe>) {}

  async execute(query: UpdateRecipeQuery) {
    const recipe = await this.recipeRepository.updateRecipe(query)
    return this.presenter.present(recipe)
  }
}
