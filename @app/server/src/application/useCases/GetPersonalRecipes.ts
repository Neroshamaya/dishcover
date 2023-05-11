import type { GetUserRecipesQuery } from '@dishcover/shared/types/requests/Recipe'

import Recipe from '../../domain/models/Recipe'
import type UseCase from '../../domain/types/IUseCase'
import RecipeRepository from '../repositories/RecipeRepository'
import { RecipeDtoType } from '@dishcover/shared/types/resources'

export class GetPersonalRecipes<OutputType> implements UseCase<GetUserRecipesQuery> {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(query: { userId: string }): Promise<OutputType | RecipeDtoType[]> {
    const { userId } = query
    const recipes = await this.recipeRepository.retrieveAllFromUser(userId)
    return recipes.map((recipes) => recipes.toResponse())
  }
}
