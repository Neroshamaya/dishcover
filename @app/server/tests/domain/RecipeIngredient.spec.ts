import RecipeIngredient from '../../src/domain/models/RecipeIngredient'
import {
  Prisma,
  RecipeIngredient as PrismaRecipeIngredient,
  Ingredient as PrismaIngredient
} from '@prisma/client'
import Id from '../../src/domain/valueObjects/Id'
import Ingredient from '../../src/domain/models/Ingredient'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

describe('RecipeIngredient', () => {
  const samplePrismaRecipeIngredient: PrismaRecipeIngredient & {
    details?: PrismaIngredient
  } = {
    id: '645bea4784be9965dbfc3a74',
    recipeId: '645bea4784be9965dbfc3a74',
    ingredientId: '645bea4784be9965dbfc3a74',
    quantity: 1,
    details: {
      id: '645bea4784be9965dbfc3a74',
      label: 'Test Ingredient',
      iconLink: 'http://anything',
      description: 'Test Ingredient Description',
      authorId: '645bea4784be9965dbfc3a74'
    }
  }

  it('should create RecipeIngredient instance from a Prisma object', () => {
    const recipeIngredient = RecipeIngredient.fromPrisma(samplePrismaRecipeIngredient)

    expect(recipeIngredient).toBeInstanceOf(RecipeIngredient)
    expect(recipeIngredient.id?.value).toEqual(samplePrismaRecipeIngredient.id)
    expect(recipeIngredient.ingredientId?.value).toEqual(samplePrismaRecipeIngredient.ingredientId)
    expect(recipeIngredient.quantity).toEqual(samplePrismaRecipeIngredient.quantity)
    expect(recipeIngredient.recipeId?.value).toEqual(samplePrismaRecipeIngredient.recipeId)
  })
})
