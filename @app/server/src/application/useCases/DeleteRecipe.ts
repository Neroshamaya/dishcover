import type { DeleteRecipeQuery } from '@dishcover/shared/types/requests/Recipe'

import type UseCase from '../../domain/types/IUseCase'
import RecipeRepository from '../repositories/RecipeRepository'

export class DeleteRecipe<OutputType> implements UseCase<DeleteRecipeQuery> {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(query: DeleteRecipeQuery): Promise<OutputType | void> {
    await this.recipeRepository.deleteRecipe(query.id)
  }
}
