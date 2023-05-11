import { PrismaClient, Recipe as PrismaRecipe, PrismaPromise, Prisma } from '@prisma/client'
import RecipeRepository from '../../../src/application/repositories/RecipeRepository'
import Recipe from '../../../src/domain/models/Recipe'
import UniqueConstraintError from '../../../src/application/errors/UniqueConstraintError'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import RecipeIngredient from '../../../src/domain/models/RecipeIngredient'

import Id from '../../../src/domain/valueObjects/Id'

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

// Mock PrismaClient
const prismaClient: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>()
const recipeRepository = new RecipeRepository(prismaClient)

describe('RecipeRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('retrieveAll', () => {
    it('should return all recipes', async () => {
      // Mock database response
      prismaClient.recipe.findMany.calledWith(any()).mockResolvedValue([fakeRecipe])

      // Test
      const recipes = await recipeRepository.retrieveAll()

      // Assertions
      expect(recipes).toBeInstanceOf(Array)
      recipes.forEach((recipe) => {
        expect(recipe).toBeInstanceOf(Recipe)
      })
    })
  })

  describe('retrieveAllFromUser', () => {
    it('should return all recipes from a specific user', async () => {
      // Mock database response
      prismaClient.recipe.findMany.calledWith(any()).mockResolvedValue([fakeRecipe])

      // Test
      const recipes = await recipeRepository.retrieveAllFromUser('645bfaaa938e925ecfa84e44')

      // Assertions
      expect(recipes).toBeInstanceOf(Array)
      recipes.forEach((recipe) => {
        expect(recipe).toBeInstanceOf(Recipe)
        expect(recipe.authorId.value).toEqual('645bfaaa938e925ecfa84e44')
      })
    })
  })

  describe('createRecipe', () => {
    it('should create a new recipe and return it', async () => {
      // Prepare test data
      const prismaRecipe = {
        id: '645bf4840e6553525c44ccdb',
        authorId: '645bf4840e6553525c44ccdb',
        description: 'description',
        label: 'label',
        created: new Date(),
        updated: new Date(),
        author: {
          id: '645bfcc71ba3dde37afdeadb',
          created: new Date(),
          email: 'user@example.com',
          password: 'password',
          salt: 'pepper',
          updated: new Date()
        },
        ingredients: [
          {
            id: '645bf4840e6553525c44ccdb',
            ingredientId: '645bf4840e6553525c44ccdb',
            quantity: 1,
            recipeId: '645bf4840e6553525c44ccdb',
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
            recipeId: '645bf4840e6553525c44ccdb',
            details: {
              id: '645bf4840e6553525c44ccdb',
              label: 'label',
              description: 'description',
              iconLink: 'https://example.com/image.png',
              authorId: '645bfaaa938e925ecfa84e44'
            }
          }
        ],
        image: 'https://example.com/image.png',
        recipeIngredientIds: ['645bf4840e6553525c44ccdb', '645bf4840e6553525c44ccdb']
      }
      const newRecipe = Recipe.fromPrisma(prismaRecipe)

      // Mock database response
      prismaClient.recipe.create.calledWith(any()).mockResolvedValue(prismaRecipe)

      // Test
      const createdRecipe = await recipeRepository.createRecipe(newRecipe)

      // Assertions
      expect(createdRecipe).toBeInstanceOf(Recipe)
      expect(createdRecipe.id).not.toBeUndefined()
    })

    it('should throw a UniqueConstraintError when a recipe with the same unique fields already exists', async () => {
      // Prepare test data
      const duplicateRecipe = Recipe.fromPrisma(fakeRecipe)

      // Mock database response
      prismaClient.recipe.create.calledWith(any()).mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
          code: 'P2002',
          clientVersion: '6.6.6',
          meta: { target: '' }
        })
      )

      // Test and Assertions
      await expect(recipeRepository.createRecipe(duplicateRecipe)).rejects.toThrow(
        UniqueConstraintError
      )
    })
  })

  describe('deleteRecipe', () => {
    it('should delete a recipe', async () => {
      // Mock database response
      prismaClient.recipe.delete.calledWith(any()).mockResolvedValue(fakeRecipe)

      // Test
      await recipeRepository.deleteRecipe('645bf4840e6553525c44ccdb')

      // Assertions
      expect(prismaClient.recipe.delete).toHaveBeenCalledTimes(1)
    })
  })

  describe('updateRecipe', () => {
    it('should update a recipe and return it', async () => {
      // Prepare test data
      const recipeToUpdate = new Recipe({
        id: new Id('645bf4840e6553525c44ccdb'),
        authorId: new Id('645bf4840e6553525c44ccdb'),
        description: 'description',
        label: 'label',
        recipeIngredientIds: [
          new Id('645bf4840e6553525c44ccdb'),
          new Id('645bf4840e6553525c44ccdb')
        ],
        recipeIngredients: [
          new RecipeIngredient({
            id: new Id('645bf4840e6553525c44ccdb'),
            ingredientId: new Id('645bf4840e6553525c44ccdb'),
            quantity: 1
          }),
          new RecipeIngredient({
            id: new Id('645bf4840e6553525c44ccdb'),
            ingredientId: new Id('645bf4840e6553525c44ccdb'),
            quantity: 1
          })
        ]
      })

      // Mock database response
      prismaClient.recipe.update.calledWith(any()).mockResolvedValue(fakeRecipe)

      // Test
      const updatedRecipe = await recipeRepository.updateRecipe(recipeToUpdate)

      // Assertions
      expect(updatedRecipe).toBeInstanceOf(Recipe)
    })

    it('should throw a UniqueConstraintError when updating a recipe with duplicate unique fields', async () => {
      // Prepare test data
      const duplicateRecipe = new Recipe({
        id: new Id('645bf4840e6553525c44ccdb'),
        authorId: new Id('645bf4840e6553525c44ccdb'),
        description: 'description',
        label: 'label',
        recipeIngredientIds: [
          new Id('645bf4840e6553525c44ccdb'),
          new Id('645bf4840e6553525c44ccdb')
        ],
        recipeIngredients: [
          new RecipeIngredient({
            id: new Id('645bf4840e6553525c44ccdb'),
            ingredientId: new Id('645bf4840e6553525c44ccdb'),
            quantity: 1
          }),
          new RecipeIngredient({
            id: new Id('645bf4840e6553525c44ccdb'),
            ingredientId: new Id('645bf4840e6553525c44ccdb'),
            quantity: 1
          })
        ]
      })

      // Mock database response
      prismaClient.recipe.update.calledWith(any()).mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
          code: 'P2002',
          clientVersion: '6.6.6',
          meta: { target: '' }
        })
      )

      // Test and Assertions
      await expect(recipeRepository.updateRecipe(duplicateRecipe)).rejects.toThrow(
        UniqueConstraintError
      )
    })
  })
})
