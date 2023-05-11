import { GetIngredients } from '../../../src/application/useCases/GetIngredients'
import IngredientRepository from '../../../src/application/repositories/IngredientRepository'
import Ingredient from '../../../src/domain/models/Ingredient'
import { IngredientDtoType } from '@dishcover/shared/types/resources'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import Id from '../../../src/domain/valueObjects/Id'
import Uri from '../../../src/domain/valueObjects/Uri'
// Mock the IngredientRepository
const ingredientRepositoryMock = mockDeep<IngredientRepository>()

describe('GetIngredients', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should return all ingredients', async () => {
      const ingredients = [
        new Ingredient({
          id: new Id('645bfcc71ba3dde37afdeadb'),
          authorId: new Id('645bfcc71ba3dde37afdeadb'),
          label: 'ingredient-label',
          iconLink: new Uri('http://ingredient-icon-link'),
          description: 'ingredient-description'
        }),
        new Ingredient({
          id: new Id('645bfcc71ba3dde37afdeadb'),
          authorId: new Id('645bfcc71ba3dde37afdeadb'),
          label: 'ingredient-label',
          iconLink: new Uri('http://ingredient-icon-link'),
          description: 'ingredient-description'
        })
      ]

      ingredientRepositoryMock.getAll.calledWith().mockResolvedValue(ingredients)

      const getIngredients = new GetIngredients(ingredientRepositoryMock)

      const result = await getIngredients.execute()

      expect(result).toEqual(ingredients.map((i) => i.toResponse()))
      expect(ingredientRepositoryMock.getAll).toHaveBeenCalled()
    })
  })
})
