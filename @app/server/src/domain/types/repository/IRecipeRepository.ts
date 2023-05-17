import {
  CreateRecipeQuery,
  DeleteRecipeQuery,
  GetAllRecipesQuery,
  GetUserRecipesQuery,
  UpdateRecipeQuery
} from '@dishcover/shared/types/requests'

import type Recipe from '../../models/Recipe'

export default interface IRecipeRepository {
  retrieveAll(query: GetAllRecipesQuery | GetUserRecipesQuery): Promise<Recipe[]>
  createRecipe(query: CreateRecipeQuery): Promise<Recipe>
  deleteRecipe(query: DeleteRecipeQuery): Promise<void>
  updateRecipe(query: UpdateRecipeQuery): Promise<Recipe>
}
