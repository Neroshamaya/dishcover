import { Optional, Overwrite } from 'utility-types'
import { RecipeIngredientDtoType } from '../resources/RecipeIngredient'
import z from 'zod'

export type CreateRecipeIngredientQuery = Omit<RecipeIngredientDtoType, 'id' | 'details'>
