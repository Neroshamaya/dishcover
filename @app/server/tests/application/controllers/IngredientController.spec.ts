import IngredientController from '../../../src/application/controllers/IngredientController'
import IngredientRepository from '../../../src/application/repositories/IngredientRepository'
import Ingredient from '../../../src/domain/models/Ingredient'
import { CreateIngredientQuery, UpdateIngredientQuery } from '@dishcover/shared/types/requests'
import Id from '../../../src/domain/valueObjects/Id'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

describe('IngredientController', () => {
  const prismaClient = mockDeep<PrismaClient>()
  const ingredientRepoMock = new IngredientRepository(prismaClient)
  const ingredientController = new IngredientController(ingredientRepoMock)

  const sampleIngredient = new Ingredient({
    id: new Id('645bede6302c2171e27c7ed4'),
    authorId: new Id('645bede6302c2171e27c7ed4'),
    label: 'sample-label',
    description: 'sample-description'
  })

  const createIngredientQuery: CreateIngredientQuery = {
    authorId: '645bede6302c2171e27c7ed4',
    label: 'sample-label',
    description: 'sample-description'
  }

  const updateIngredientQuery: UpdateIngredientQuery = {
    label: 'Updated Sample Ingredient',
    authorId: '645bede6302c2171e27c7ed4'
  }

  const deleteIngredientId = '645bede6302c2171e27c7ed4'

  it('should retrieve all ingredients', async () => {
    const repoSpy = jest.spyOn(ingredientRepoMock, 'getAll').mockResolvedValue([sampleIngredient])

    const result = await ingredientController.retrieveAll()

    expect(repoSpy).toHaveBeenCalled()
    expect(JSON.stringify(result)).toEqual(JSON.stringify([sampleIngredient.toResponse()]))

    repoSpy.mockRestore()
  })

  it('should create an ingredient', async () => {
    const repoSpy = jest.spyOn(ingredientRepoMock, 'create').mockResolvedValue(sampleIngredient)

    const result = await ingredientController.createIngredient(createIngredientQuery)

    expect(repoSpy).toHaveBeenCalled()
    expect(JSON.stringify(result)).toEqual(JSON.stringify(sampleIngredient.toResponse()))

    repoSpy.mockRestore()
  })

  it('should update an ingredient', async () => {
    const repoSpy = jest.spyOn(ingredientRepoMock, 'update').mockResolvedValue(sampleIngredient)

    const result = await ingredientController.updateIngredient(updateIngredientQuery)

    expect(repoSpy).toHaveBeenCalled()
    expect(JSON.stringify(result)).toEqual(JSON.stringify(sampleIngredient.toResponse()))

    repoSpy.mockRestore()
  })

  it('should delete an ingredient', async () => {
    const repoSpy = jest.spyOn(ingredientRepoMock, 'delete').mockResolvedValue()

    const result = await ingredientController.deleteIngredient({ id: deleteIngredientId })

    expect(repoSpy).toHaveBeenCalled()
    expect(result).toBeUndefined()

    repoSpy.mockRestore()
  })
})
