import { GetUserRecipesQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'
import { CreateRecipeQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'
import { UpdateRecipeQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'
import { DeleteRecipeQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'
import { CreateRecipeQuery, UpdateRecipeQuery } from '@dishcover/shared/types/requests/Recipe'

import ValidationError from '../errors/ValidationError'
import type RecipeRepository from '../repositories/RecipeRepository'
import { CreateRecipe } from '../useCases/CreateRecipe'
import { DeleteRecipe } from '../useCases/DeleteRecipe'
import { GetAllRecipes } from '../useCases/GetAllRecipes'
import { GetPersonalRecipes } from '../useCases/GetPersonalRecipes'
import { UpdateRecipe } from '../useCases/UpdateRecipe'

export default class RecipeController {
  constructor(private recipeRepository: RecipeRepository) {}

  async retrieveAllFromUser(args: unknown) {
    const result = GetUserRecipesQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new GetPersonalRecipes(this.recipeRepository)
    const response = await useCase.execute(result.data)
    return response
  }

  async retrieveAll() {
    const useCase = new GetAllRecipes(this.recipeRepository)
    const response = await useCase.execute()
    return response
  }

  async createRecipe(args: unknown) {
    const result = CreateRecipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new CreateRecipe(this.recipeRepository)
    const response = await useCase.execute(result.data as CreateRecipeQuery)
    return response
  }

  async deleteRecipe(args: unknown) {
    const result = DeleteRecipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new DeleteRecipe(this.recipeRepository)
    await useCase.execute(result.data)
  }

  async updateRecipe(args: unknown) {
    const result = UpdateRecipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new UpdateRecipe(this.recipeRepository)
    const response = await useCase.execute(result.data)
    return response
  }
}
