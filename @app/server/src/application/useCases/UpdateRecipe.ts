import { UpdateRecipeQuery } from '@dishcover/shared/types/requests/Recipe'

import Recipe from '../../domain/models/Recipe'
import type UseCase from '../../domain/types/IUseCase'
import RecipeRepository from '../repositories/RecipeRepository'
import { RecipeDtoType } from '@dishcover/shared/types/resources'

export class UpdateRecipe<OutputType> implements UseCase<UpdateRecipeQuery> {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(query: UpdateRecipeQuery): Promise<OutputType | RecipeDtoType> {
    const updatedRecipe = Recipe.fromRecipeQuery(query)
    const recipe = await this.recipeRepository.updateRecipe(updatedRecipe)
    return recipe.toResponse()
  }
}
