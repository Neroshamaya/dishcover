import Recipe from '../../src/domain/models/Recipe'
import { CreateRecipeQuery } from '@dishcover/shared/types/requests'
import {
  Prisma,
  Recipe as PrismaRecipe,
  User as PrismaUser,
  RecipeIngredient as PrismaRecipeIngredient,
  Ingredient as PrismaIngredient
} from '@prisma/client'
import Id from '../../src/domain/valueObjects/Id'
import Uri from '../../src/domain/valueObjects/Uri'
import RecipeIngredient from '../../src/domain/models/RecipeIngredient'
import User from '../../src/domain/models/User'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

describe('Recipe', () => {
  const sampleQuery: CreateRecipeQuery = {
    label: 'Test Recipe',
    description: 'A test recipe description',
    authorId: '645be700c18dab1da9779ff8',
    recipeIngredients: [
      {
        ingredientId: '645be700c18dab1da9779ff8',
        quantity: 1
      }
    ]
  }

  const samplePrismaRecipe: PrismaRecipe & {
    author: PrismaUser
    ingredients: (PrismaRecipeIngredient & { details?: PrismaIngredient })[]
  } = {
    id: '645be700c18dab1da9779ff8',
    label: 'Test Recipe',
    description: 'A test recipe description',
    authorId: '645be700c18dab1da9779ff8',
    created: new Date(),
    updated: new Date(),
    image: 'http://example.com/image.png',
    author: {
      id: '645be700c18dab1da9779ff8',
      email: 'author@example.com',
      password: 'hashed-password',
      salt: 'pepper',
      created: new Date(),
      updated: new Date()
    },
    recipeIngredientIds: ['645be700c18dab1da9779ff8'],
    ingredients: [
      {
        id: '645be700c18dab1da9779ff8',
        recipeId: '645be700c18dab1da9779ff8',
        ingredientId: '645be700c18dab1da9779ff8',
        quantity: 1,
        details: {
          id: '645be700c18dab1da9779ff8',
          label: 'Test Ingredient',
          authorId: '645be700c18dab1da9779ff8',
          iconLink: 'http://example.com/image.png',
          description: 'A test ingredient description'
        }
      }
    ]
  }

  it('should create Recipe instance from a CreateRecipeQuery', () => {
    const recipe = Recipe.fromRecipeQuery(sampleQuery)

    expect(recipe).toBeInstanceOf(Recipe)
    expect(recipe.label).toEqual(sampleQuery.label)
    expect(recipe.description).toEqual(sampleQuery.description)
    expect(recipe.authorId.value).toEqual(sampleQuery.authorId)
  })

  it('should create Recipe instance from a Prisma object', () => {
    const recipe = Recipe.fromPrisma(samplePrismaRecipe)

    expect(recipe).toBeInstanceOf(Recipe)
    expect(recipe.label).toEqual(samplePrismaRecipe.label)
    expect(recipe.description).toEqual(samplePrismaRecipe.description)
    expect(recipe.authorId.value).toEqual(samplePrismaRecipe.authorId)
  })
})
