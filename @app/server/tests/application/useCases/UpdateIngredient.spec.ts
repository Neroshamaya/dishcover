import { UpdateIngredient } from '../../../src/application/useCases/UpdateIngredient'
import Ingredient from '../../../src/domain/models/Ingredient'
import IngredientRepository from '../../../src/application/repositories/IngredientRepository'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import Id from '../../../src/domain/valueObjects/Id'
import Uri from '../../../src/domain/valueObjects/Uri'

const fakeIngredient = {
  id: '645bfcc71ba3dde37afdeadb',
  authorId: '645bfcc71ba3dde37afdeadb',
  label: 'ingredient-label',
  iconLink: 'http://ingredient-icon-link'
}
// Mock the IngredientRepository
const ingredientRepositoryMock = mockDeep<IngredientRepository>()

describe('UpdateIngredient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should update an ingredient', async () => {
      const updatedIngredient = Ingredient.fromCreateIngredientQuery(fakeIngredient)

      ingredientRepositoryMock.update
        .calledWith(updatedIngredient)
        .mockResolvedValue(updatedIngredient)

      const updateIngredient = new UpdateIngredient(ingredientRepositoryMock)

      const result = await updateIngredient.execute(updatedIngredient)

      expect(result).toEqual(updatedIngredient.toResponse())
      expect(ingredientRepositoryMock.update).toHaveBeenCalledWith(updatedIngredient)
    })
  })
})
