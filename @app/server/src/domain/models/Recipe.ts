import { CreateRecipeQuery, UpdateRecipeQuery } from '@dishcover/shared/types/requests'
import Prisma, { Prisma as PrismaClass } from '@prisma/client'

import RecipeIngredient from '../models/RecipeIngredient'
import User from '../models/User'
import Email from '../valueObjects/Email'
import Id from '../valueObjects/Id'
import Uri from '../valueObjects/Uri'
import { RecipeDtoType, UserDtoType } from '@dishcover/shared/types/resources'
import Ingredient from './Ingredient'

interface RecipeParams {
  id: Id
  label: string
  description: string
  created: Date
  updated: Date
  image?: Uri
  recipeIngredients: RecipeIngredient[]
  author: User
}

export default class Recipe {
  readonly id: Id
  readonly label: string
  readonly description: string
  readonly created: Date
  readonly updated: Date
  readonly image?: Uri
  readonly recipeIngredients: RecipeIngredient[]
  readonly author: User
  constructor({
    id,
    label,
    description,
    created,
    updated,
    image,
    recipeIngredients,
    author
  }: RecipeParams) {
    this.id = id
    this.label = label
    this.description = description
    this.created = created
    this.updated = updated
    this.image = image
    this.recipeIngredients = recipeIngredients
    this.author = author
  }
}
