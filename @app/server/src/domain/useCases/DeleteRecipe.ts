import type { DeleteRecipeQuery } from '@dishcover/shared/types/requests/Recipe'

import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

import type UseCase from '../types/IUseCase'

export class DeleteRecipe implements UseCase<DeleteRecipeQuery> {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(query: DeleteRecipeQuery) {
    await this.recipeRepository.deleteRecipe(query)
  }
}
