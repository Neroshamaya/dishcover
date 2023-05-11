import { PrismaClient, Prisma, Ingredient as PrismaIngredient } from '@prisma/client'
import Ingredient from '../../../src/domain/models/Ingredient'
import IngredientRepository from '../../../src/application/repositories/IngredientRepository'
import UniqueConstraintError from '../../../src/application/errors/UniqueConstraintError'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import Id from '../../../src/domain/valueObjects/Id'
import Uri from '../../../src/domain/valueObjects/Uri'

// Mock PrismaClient
const prismaClient: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>()
const ingredientRepository = new IngredientRepository(prismaClient)

describe('IngredientRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('should return all ingredients', async () => {
      prismaClient.ingredient.findMany.calledWith(any()).mockResolvedValue([
        {
          id: '645bfcc71ba3dde37afdeadb',
          label: 'somelabel',
          description: 'ingredient-description',
          iconLink: 'http://ingredienticonlink',
          authorId: '645bfcc71ba3dde37afdeadb'
        }
      ])

      const ingredients = await ingredientRepository.getAll()

      expect(ingredients).toBeInstanceOf(Array)
      ingredients.forEach((ingredient) => {
        expect(ingredient).toBeInstanceOf(Ingredient)
      })
    })
  })

  describe('delete', () => {
    it('should delete an ingredient', async () => {
      prismaClient.ingredient.delete.calledWith(any()).mockResolvedValue({
        id: '645bf73ad97d21dc77453252',
        description: 'Ingredient',
        label: 'Ingredient',
        iconLink: 'http://ingredienticonlink',
        authorId: '645bf73ad97d21dc77453252'
      })

      await ingredientRepository.delete('ingredient-id')

      expect(prismaClient.ingredient.delete).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    it('should create a new ingredient and return it', async () => {
      const newIngredient = new Ingredient({
        id: new Id('645bf73ad97d21dc77453252'),
        authorId: new Id('645bf73ad97d21dc77453252'),
        label: 'ingredient-label',
        iconLink: new Uri('http://iconlink'),
        description: 'ingredient-description'
      })

      prismaClient.ingredient.create.calledWith(any()).mockResolvedValue({
        id: '645bf73ad97d21dc77453252',
        description: 'ingredient-description',
        label: 'ingredient-label',
        iconLink: 'http://iconlink',
        authorId: '645bf73ad97d21dc77453252'
      })

      const createdIngredient = await ingredientRepository.create(newIngredient)

      expect(createdIngredient).toBeInstanceOf(Ingredient)
    })

    it('should throw a UniqueConstraintError when an ingredient with the same unique fields already exists', async () => {
      const duplicateIngredient = new Ingredient({
        id: new Id('645bfcc71ba3dde37afdeadb'),
        authorId: new Id('645bfcc71ba3dde37afdeadb'),
        label: 'ingredient-label',
        iconLink: new Uri('http://ingredient-icon-link'),
        description: 'ingredient-description'
      })

      prismaClient.ingredient.create.calledWith(any()).mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
          code: 'P2002',
          clientVersion: '6.6.6',
          meta: { target: '' }
        })
      )

      await expect(ingredientRepository.create(duplicateIngredient)).rejects.toThrow(
        UniqueConstraintError
      )
    })
  })

  describe('update', () => {
    it('should update an ingredient and return it', async () => {
      const prismaIngredient = {
        id: new Id('645bf73ad97d21dc77453252'),
        authorId: new Id('645bf73ad97d21dc77453252'),
        label: 'ingredient-label',
        iconLink: new Uri('http://ingredient'),
        description: 'ingredient-description'
      }
      const ingredientToUpdate = new Ingredient(prismaIngredient)

      prismaClient.ingredient.update
        .calledWith(any())
        .mockResolvedValue(ingredientToUpdate.toResponse() as PrismaIngredient)

      const updatedIngredient = await ingredientRepository.update(ingredientToUpdate)

      expect(updatedIngredient).toBeInstanceOf(Ingredient)
    })

    it('should throw a UniqueConstraintError when updating an ingredient with duplicate unique fields', async () => {
      const duplicateIngredient = new Ingredient({
        id: new Id('645bfcc71ba3dde37afdeadb'),
        authorId: new Id('645bfcc71ba3dde37afdeadb'),
        label: 'ingredient-label',
        iconLink: new Uri('http://ingredient'),
        description: 'ingredient-description'
      })

      prismaClient.ingredient.update.calledWith(any()).mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
          code: 'P2002',
          clientVersion: '6.6.6',
          meta: { target: '' }
        })
      )

      await expect(ingredientRepository.update(duplicateIngredient)).rejects.toThrow(
        UniqueConstraintError
      )
    })
  })
})
