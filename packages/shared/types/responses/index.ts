import { LoginResponse, RegisterResponse } from './Authentication'
import {
  CreateIngredientResponse,
  UpdateIngredientResponse,
  GetIngredientsResponse
} from './Ingredient'
import { CreateRecipeResponse, UpdateRecipeResponse, GetRecipesResponse } from './Recipe'
export type ResponseType =
  | LoginResponse
  | RegisterResponse
  | GetRecipesResponse
  | UpdateIngredientResponse
  | CreateIngredientResponse
  | GetIngredientsResponse
  | CreateRecipeResponse
  | UpdateRecipeResponse
export {
  LoginResponse,
  RegisterResponse,
  UpdateIngredientResponse,
  CreateIngredientResponse,
  GetIngredientsResponse,
  CreateRecipeResponse,
  UpdateRecipeResponse,
  GetRecipesResponse
}
