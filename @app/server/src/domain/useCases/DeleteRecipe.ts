import type { DeleteRecipeQuery } from '@dishcover/shared/types/requests/Recipe'

import type UseCase from '../types/IUseCase'
import IRecipeRepository from '@/domain/types/repository/IRecipeRepository'

export class DeleteRecipe implements UseCase<DeleteRecipeQuery> {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(query: DeleteRecipeQuery) {
    await this.recipeRepository.deleteRecipe(query)
  }
}
