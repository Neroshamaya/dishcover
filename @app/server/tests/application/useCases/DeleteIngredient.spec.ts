import { DeleteIngredient } from '../../../src/application/useCases/DeleteIngredient'
import IngredientRepository from '../../../src/application/repositories/IngredientRepository'
import { DeleteIngredientQuery } from '@dishcover/shared/types/requests/Ingredient'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mock the IngredientRepository
const ingredientRepositoryMock = mockDeep<IngredientRepository>()

describe('DeleteIngredient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should delete an ingredient and return void', async () => {
      const deleteIngredientQuery: DeleteIngredientQuery = {
        id: 'ingredient-id'
      }

      ingredientRepositoryMock.delete.calledWith(any()).mockResolvedValue(undefined)

      const deleteIngredient = new DeleteIngredient(ingredientRepositoryMock)

      const result = await deleteIngredient.execute(deleteIngredientQuery)

      expect(result).toBeUndefined()
      expect(ingredientRepositoryMock.delete).toHaveBeenCalledWith(deleteIngredientQuery.id)
    })
  })
})
