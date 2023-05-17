import type Recipe from '../../models/Recipe'
import {
  CreateRecipeQuery,
  GetAllRecipesQuery,
  GetUserRecipesQuery,
  DeleteRecipeQuery,
  UpdateRecipeQuery
} from '@dishcover/shared/types/requests'

export default interface IRecipeRepository {
  retrieveAll(query: GetAllRecipesQuery | GetUserRecipesQuery): Promise<Recipe[]>
  createRecipe(query: CreateRecipeQuery): Promise<Recipe>
  deleteRecipe(query: DeleteRecipeQuery): Promise<void>
  updateRecipe(query: UpdateRecipeQuery): Promise<Recipe>
}
