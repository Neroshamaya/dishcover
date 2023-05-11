import { CreateIngredient } from '../../../src/application/useCases/CreateIngredient'
import Ingredient from '../../../src/domain/models/Ingredient'
import IngredientRepository from '../../../src/application/repositories/IngredientRepository'
import { IngredientDtoType } from '@dishcover/shared/types/resources'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
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

describe('CreateIngredient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should create an ingredient and return the presented output', async () => {
      const ingredient = Ingredient.fromCreateIngredientQuery(fakeIngredient)
      const presentedIngredient: IngredientDtoType = {
        id: ingredient.id?.value,
        authorId: ingredient.authorId?.value,
        label: ingredient.label,
        description: ingredient.description,
        iconLink: ingredient.iconLink?.value
      }

      ingredientRepositoryMock.create.calledWith(any()).mockResolvedValue(ingredient)

      const createIngredient = new CreateIngredient(ingredientRepositoryMock)

      const result = await createIngredient.execute(ingredient)

      expect(result).toEqual(presentedIngredient)
      expect(ingredientRepositoryMock.create).toHaveBeenCalledWith(ingredient)
    })
  })
})
