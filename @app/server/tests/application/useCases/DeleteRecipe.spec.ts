import { DeleteRecipe } from '../../../src/application/useCases/DeleteRecipe'
import RecipeRepository from '../../../src/application/repositories/RecipeRepository'
import { DeleteRecipeQuery } from '@dishcover/shared/types/requests/Recipe'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mock the RecipeRepository
const recipeRepositoryMock = mockDeep<RecipeRepository>()
describe('DeleteRecipe', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should delete a recipe and return void', async () => {
      const deleteRecipeQuery: DeleteRecipeQuery = {
        id: 'recipe-id'
      }

      recipeRepositoryMock.deleteRecipe.calledWith(any()).mockResolvedValue(undefined)

      const deleteRecipe = new DeleteRecipe(recipeRepositoryMock)

      const result = await deleteRecipe.execute(deleteRecipeQuery)

      expect(result).toBeUndefined()
      expect(recipeRepositoryMock.deleteRecipe).toHaveBeenCalledWith(deleteRecipeQuery.id)
    })
  })
})
