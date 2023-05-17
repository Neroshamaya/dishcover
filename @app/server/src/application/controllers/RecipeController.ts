import { GetUserRecipesQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'
import { CreateRecipeQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'
import { UpdateRecipeQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'
import { DeleteRecipeQuerySchema } from '@dishcover/shared/schemas/requests/Recipe'

import { CreateRecipe } from '../../domain/useCases/CreateRecipe'
import { DeleteRecipe } from '../../domain/useCases/DeleteRecipe'
import { GetAllRecipes } from '../../domain/useCases/GetAllRecipes'
import { GetPersonalRecipes } from '../../domain/useCases/GetPersonalRecipes'
import { UpdateRecipe } from '../../domain/useCases/UpdateRecipe'
import ValidationError from '../errors/ValidationError'
import { RecipePresenter } from '../presenters/RecipePresenter'
import { RecipesPresenter } from '../presenters/RecipesPresenter'
import type RecipeRepository from '../repositories/RecipeRepository'

export default class RecipeController {
  constructor(
    private recipeRepository: RecipeRepository,
    private recipePresenter: RecipePresenter,
    private recipesPresenter: RecipesPresenter
  ) {}

  async retrieveAllFromUser(args: unknown) {
    const result = GetUserRecipesQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new GetPersonalRecipes(this.recipeRepository, this.recipesPresenter)
    const response = await useCase.execute(result.data)
    return response
  }

  async retrieveAll() {
    const useCase = new GetAllRecipes(this.recipeRepository, this.recipesPresenter)
    const response = await useCase.execute({})
    return response
  }

  async createRecipe(args: unknown) {
    const result = CreateRecipeQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new CreateRecipe(this.recipeRepository, this.recipePresenter)
    const response = await useCase.execute(result.data)
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
    const useCase = new UpdateRecipe(this.recipeRepository, this.recipePresenter)
    const response = await useCase.execute(result.data)
    return response
  }
}
