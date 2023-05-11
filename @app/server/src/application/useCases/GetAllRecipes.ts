import type { GetUserRecipesQuery } from '@dishcover/shared/types/requests/Recipe'

import Recipe from '../../domain/models/Recipe'
import type UseCase from '../../domain/types/IUseCase'
import RecipeRepository from '../repositories/RecipeRepository'
import { RecipeDtoType } from '@dishcover/shared/types/resources'

export class GetAllRecipes<OutputType> implements UseCase<GetUserRecipesQuery> {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(): Promise<OutputType | RecipeDtoType[]> {
    const recipes = await this.recipeRepository.retrieveAll()
    return recipes.map((recipe) => recipe.toResponse())
  }
}
