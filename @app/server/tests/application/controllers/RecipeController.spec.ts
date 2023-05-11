import RecipeController from '../../../src/application/controllers/RecipeController'
import RecipeRepository from '../../../src/application/repositories/RecipeRepository'
import Recipe from '../../../src/domain/models/Recipe'
import RecipeIngredient from '../../../src/domain/models/RecipeIngredient'

import {
  GetUserRecipesQuery,
  CreateRecipeQuery,
  UpdateRecipeQuery
} from '@dishcover/shared/types/requests/Recipe'
import Id from '../../../src/domain/valueObjects/Id'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

describe('RecipeController', () => {
  const prismaClient = mockDeep<PrismaClient>()

  const recipeRepoMock = new RecipeRepository(prismaClient)
  const recipeController = new RecipeController(recipeRepoMock)

  const sampleRecipe = new Recipe({
    id: new Id('645bec31999805ff039c30dd'),
    authorId: new Id('645bec31999805ff039c30dd'),
    description: 'description',
    label: 'label',
    recipeIngredientIds: [new Id('645bec31999805ff039c30dd'), new Id('645bec31999805ff039c30dd')],
    recipeIngredients: [
      new RecipeIngredient({
        id: new Id('645bec31999805ff039c30dd'),
        ingredientId: new Id('645bec31999805ff039c30dd'),
        quantity: 1
      }),
      new RecipeIngredient({
        id: new Id('645bec31999805ff039c30dd'),
        ingredientId: new Id('645bec31999805ff039c30dd'),
        quantity: 1
      })
    ]
  })

  const getUserRecipesQuery: GetUserRecipesQuery = {
    userId: '645bec31999805ff039c30dd'
  }

  const createRecipeQuery: CreateRecipeQuery = {
    authorId: '645bec31999805ff039c30dd',
    description: 'description',
    label: 'label',
    recipeIngredients: [
      {
        ingredientId: '645bec31999805ff039c30dd',
        quantity: 1
      },
      {
        ingredientId: '645bec31999805ff039c30dd',
        quantity: 1
      }
    ]
  }

  const updateRecipeQuery: UpdateRecipeQuery = {
    id: '645bec31999805ff039c30dd',
    authorId: '645bec31999805ff039c30dd',
    description: 'updated description',
    label: 'updated label',
    recipeIngredients: [
      {
        ingredientId: '645bec31999805ff039c30dd',
        quantity: 1
      },
      {
        ingredientId: '645bec31999805ff039c30dd',
        quantity: 1
      }
    ]
  }

  const deleteRecipeId = '645bec31999805ff039c30dd'

  it('should retrieve all recipes from user', async () => {
    const repoSpy = jest
      .spyOn(recipeRepoMock, 'retrieveAllFromUser')
      .mockResolvedValue([sampleRecipe])

    const result = await recipeController.retrieveAllFromUser(getUserRecipesQuery)

    expect(repoSpy).toHaveBeenCalled()
    expect(JSON.stringify(result)).toEqual(JSON.stringify([sampleRecipe.toResponse()]))

    repoSpy.mockRestore()
  })

  it('should retrieve all recipes', async () => {
    const repoSpy = jest.spyOn(recipeRepoMock, 'retrieveAll').mockResolvedValue([sampleRecipe])

    const result = await recipeController.retrieveAll()

    expect(repoSpy).toHaveBeenCalled()
    expect(JSON.stringify(result)).toEqual(JSON.stringify([sampleRecipe.toResponse()]))

    repoSpy.mockRestore()
  })

  it('should create a recipe', async () => {
    const repoSpy = jest.spyOn(recipeRepoMock, 'createRecipe').mockResolvedValue(sampleRecipe)

    const result = await recipeController.createRecipe(createRecipeQuery)

    expect(repoSpy).toHaveBeenCalled()
    expect(result).toEqual(sampleRecipe.toResponse())

    repoSpy.mockRestore()
  })

  it('should delete a recipe', async () => {
    const repoSpy = jest.spyOn(recipeRepoMock, 'deleteRecipe').mockResolvedValue()

    await recipeController.deleteRecipe({ id: deleteRecipeId })

    expect(repoSpy).toHaveBeenCalled()

    repoSpy.mockRestore()
  })

  it('should update a recipe', async () => {
    const repoSpy = jest.spyOn(recipeRepoMock, 'updateRecipe').mockResolvedValue(sampleRecipe)

    const result = await recipeController.updateRecipe(updateRecipeQuery)

    expect(repoSpy).toHaveBeenCalled()
    expect(JSON.stringify(result)).toEqual(JSON.stringify(sampleRecipe.toResponse()))

    repoSpy.mockRestore()
  })
})
