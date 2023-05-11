import type { CreateRecipeQuery } from '@dishcover/shared/types/requests/Recipe'

import Recipe from '../../domain/models/Recipe'
import type UseCase from '../../domain/types/IUseCase'
import RecipeRepository from '../repositories/RecipeRepository'
import { RecipeDtoType } from '@dishcover/shared/types/resources'

export class CreateRecipe implements UseCase<CreateRecipeQuery> {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(query: CreateRecipeQuery): Promise<RecipeDtoType> {
    const recipe = Recipe.fromRecipeQuery(query)
    const createdRecipe = await this.recipeRepository.createRecipe(recipe)
    return createdRecipe.toResponse()
  }
}
