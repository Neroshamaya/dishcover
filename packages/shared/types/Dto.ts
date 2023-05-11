import { IngredientDtoType } from './resources/Ingredient'
import { RecipeDtoType } from './resources/Recipe'
import { RecipeIngredientDtoType } from './resources/RecipeIngredient'
import { UserDtoType } from './resources/User'
export type DTOType = UserDtoType | RecipeDtoType | IngredientDtoType | RecipeIngredientDtoType
