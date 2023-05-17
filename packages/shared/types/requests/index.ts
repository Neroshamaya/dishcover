import { LoginQuery, RegisterQuery } from './Authentication'
import { CreateIngredientQuery, UpdateIngredientQuery, DeleteIngredientQuery } from './Ingredient'
import {
  CreateRecipeQuery,
  DeleteRecipeQuery,
  UpdateRecipeQuery,
  GetUserRecipesQuery,
  GetAllRecipesQuery
} from './Recipe'
import { CreateRecipeIngredientQuery } from './RecipeIngredient'

export type Query =
  | LoginQuery
  | RegisterQuery
  | CreateIngredientQuery
  | CreateRecipeQuery
  | GetAllRecipesQuery

export type Field<T extends Query> = keyof T
export {
  LoginQuery,
  RegisterQuery,
  DeleteIngredientQuery,
  CreateIngredientQuery,
  UpdateIngredientQuery,
  CreateRecipeQuery,
  CreateRecipeIngredientQuery,
  DeleteRecipeQuery,
  UpdateRecipeQuery,
  GetUserRecipesQuery,
  GetAllRecipesQuery
}
