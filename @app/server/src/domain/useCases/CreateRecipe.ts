import type { CreateRecipeQuery } from '@dishcover/shared/types/requests'
import { RecipeDtoType } from '@dishcover/shared/types/resources'
import type { CreateRecipeResponse } from '@dishcover/shared/types/responses'

import { Ipresenter } from '@/domain/types/IPresenter'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

import Recipe from '../models/Recipe'
import type UseCase from '../types/IUseCase'

export class CreateRecipe implements UseCase<CreateRecipeQuery> {
  constructor(private recipeRepository: IRecipeRepository, private presenter: Ipresenter<Recipe>) {}

  async execute(query: CreateRecipeQuery) {
    return this.presenter.present(await this.recipeRepository.createRecipe(query))
  }
}
