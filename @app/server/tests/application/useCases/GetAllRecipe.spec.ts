import { GetAllRecipes } from '../../../src/application/useCases/GetAllRecipes'
import RecipeRepository from '../../../src/application/repositories/RecipeRepository'
import Recipe from '../../../src/domain/models/Recipe'
import { RecipeDtoType } from '@dishcover/shared/types/resources'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import Id from '../../../src/domain/valueObjects/Id'
import RecipeIngredient from '../../../src/domain/models/RecipeIngredient'
const fakeRecipe = {
  id: '645bfaaa938e925ecfa84e44',
  authorId: '645bfaaa938e925ecfa84e44',
  author: {
    id: '645bfaaa938e925ecfa84e44',
    email: 'kenaa@example.com',
    salt: 'pepper',
    password: 'password',
    created: new Date(),
    updated: new Date()
  },
  description: 'description',
  label: 'label',
  recipeIngredientIds: ['645bfaaa938e925ecfa84e44', '645bfaaa938e925ecfa84e44'],
  created: new Date(),
  image: 'https://example.com/image.png',
  updated: new Date(),
  recipeIngredients: [
    {
      id: '645bf4840e6553525c44ccdb',
      ingredientId: '645bf4840e6553525c44ccdb',
      quantity: 1,
      recipeId: '645bfaaa938e925ecfa84e44',
      details: {
        id: '645bf4840e6553525c44ccdb',
        label: 'label',
        description: 'description',
        iconLink: 'https://example.com/image.png',
        authorId: '645bfaaa938e925ecfa84e44'
      }
    },
    {
      id: '645bf4840e6553525c44ccdb',
      ingredientId: '645bf4840e6553525c44ccdb',
      quantity: 1,
      recipeId: '645bfaaa938e925ecfa84e44',
      details: {
        id: '645bf4840e6553525c44ccdb',
        label: 'label',
        description: 'description',
        iconLink: 'https://example.com/image.png',
        authorId: '645bfaaa938e925ecfa84e44'
      }
    }
  ],
  ingredients: [
    {
      id: '645bf4840e6553525c44ccdb',
      ingredientId: '645bf4840e6553525c44ccdb',
      quantity: 1,
      recipeId: '645bfaaa938e925ecfa84e44',
      details: {
        id: '645bf4840e6553525c44ccdb',
        label: 'label',
        description: 'description',
        iconLink: 'https://example.com/image.png',
        authorId: '645bfaaa938e925ecfa84e44'
      }
    },
    {
      id: '645bf4840e6553525c44ccdb',
      ingredientId: '645bf4840e6553525c44ccdb',
      quantity: 1,
      recipeId: '645bfaaa938e925ecfa84e44',
      details: {
        id: '645bf4840e6553525c44ccdb',
        label: 'label',
        description: 'description',
        iconLink: 'https://example.com/image.png',
        authorId: '645bfaaa938e925ecfa84e44'
      }
    }
  ]
}
// Mock the RecipeRepository
const recipeRepositoryMock = mockDeep<RecipeRepository>()

describe('GetAllRecipes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should return all recipes', async () => {
      const recipes = [Recipe.fromPrisma(fakeRecipe), Recipe.fromPrisma(fakeRecipe)]
      recipeRepositoryMock.retrieveAll.calledWith().mockResolvedValue(recipes)

      const getAllRecipes = new GetAllRecipes(recipeRepositoryMock)

      const result = await getAllRecipes.execute()

      expect(result).toEqual(recipes.map((recipe) => recipe.toResponse()))
      expect(recipeRepositoryMock.retrieveAll).toHaveBeenCalled()
    })
  })
})
