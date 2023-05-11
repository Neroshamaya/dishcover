import { CreateRecipe } from '../../../src/application/useCases/CreateRecipe'
import Recipe from '../../../src/domain/models/Recipe'
import RecipeRepository from '../../../src/application/repositories/RecipeRepository'
import { RecipeDtoType } from '@dishcover/shared/types/resources'
import { CreateRecipeQuery } from '@dishcover/shared/types/requests/Recipe'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mock the RecipeRepository
const recipeRepositoryMock = mockDeep<RecipeRepository>()

describe('CreateRecipe', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should create a recipe and return the presented output', async () => {
      const createRecipeQuery: CreateRecipeQuery = {
        label: 'Test Recipe',
        description: 'A test recipe for testing purposes',
        authorId: '645bfcc71ba3dde37afdeadb',
        recipeIngredients: [
          {
            id: '645bfcc71ba3dde37afdeadb',
            quantity: 1,
            ingredientId: '645bfcc71ba3dde37afdeadb'
          }
        ]
      }
      const recipe = Recipe.fromRecipeQuery(createRecipeQuery)

      recipeRepositoryMock.createRecipe.calledWith(any()).mockResolvedValue(recipe)

      const createRecipe = new CreateRecipe(recipeRepositoryMock)

      const result = await createRecipe.execute(createRecipeQuery)

      expect(result).toEqual(recipe.toResponse())
    })
  })
})
