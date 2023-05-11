import { LoginQuery, RegisterQuery } from './Authentication'
import { CreateIngredientQuery, UpdateIngredientQuery } from './Ingredient'
import {
  CreateRecipeQuery,
  DeleteRecipeQuery,
  UpdateRecipeQuery,
  GetUserRecipesQuery
} from './Recipe'
import { CreateRecipeIngredientQuery } from './RecipeIngredient'

export type Query = LoginQuery | RegisterQuery | CreateIngredientQuery | CreateRecipeQuery

export type Field<T extends Query> = keyof T
export {
  LoginQuery,
  RegisterQuery,
  CreateIngredientQuery,
  UpdateIngredientQuery,
  CreateRecipeQuery,
  CreateRecipeIngredientQuery,
  DeleteRecipeQuery,
  UpdateRecipeQuery,
  GetUserRecipesQuery
}
