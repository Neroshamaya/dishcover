import request from 'supertest'
import express, { Express } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { ExpressApplication } from '../../src/infrastructure/expressServer'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import Id from '../../src/domain/valueObjects/Id'
import apiKeys from '../../src/infrastructure/security/apiKeys'
import AuthenticationController from '../../src/application/controllers/AuthenticationController'
import RecipeController from '../../src/application/controllers/RecipeController'
import IngredientController from '../../src/application/controllers/IngredientController'
import { errorHandler } from '../../src/infrastructure/expressMiddlewares/errorHandler'
import { localHostDynamicOrigin } from '../../src/infrastructure/corsOrigin'
import { apiKeyVerification } from '../../src/infrastructure/expressMiddlewares/apiKeyVerification'
import { jwtVerification } from '../../src/infrastructure/expressMiddlewares/jwtVerification'
import logRequest from '../../src/infrastructure/expressMiddlewares/logRequest'
import Email from '../../src/domain/valueObjects/Email'
import User from '../../src/domain/models/User'
import Recipe from '../../src/domain/models/Recipe'
import Ingredient from '../../src/domain/models/Ingredient'
import JwtService from '../../src/application/services/JwtService'
import RecipeRepository from '../../src/application/repositories/RecipeRepository'
import UserRepository from '../../src/application/repositories/UserRepository'
import EmailAuthenticationStrategy from '../../src/application/strategies/EmailAuthenticationStrategy'
import EmailRegistrationStrategy from '../../src/application/strategies/EmailRegistrationStrategy'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import * as awilix from 'awilix'
const { createContainer, asClass, asValue, asFunction } = awilix
let container = createContainer()
const mockAuthenticationController = mockDeep<AuthenticationController>()
const mockRecipeController = mockDeep<RecipeController>()
const mockIngredientController = mockDeep<IngredientController>()

const fakeUser = new User({
  id: new Id('645b9e6f21d4838ad33e9546'),
  email: new Email('123@mail.com'),
  salt: 'pepper',
  password: 'password'
})

const fakeIngredient = new Ingredient({
  id: new Id('645b9e6f21d4838ad33e9546'),
  authorId: new Id('645b9e6f21d4838ad33e9546'),
  description: 'description',
  label: 'recipe label'
})

const fakeRecipe = new Recipe({
  id: new Id('645b9e6f21d4838ad33e9546'),
  authorId: new Id('645b9e6f21d4838ad33e9546'),
  description: 'description',
  label: 'recipe label',
  recipeIngredients: [],
  recipeIngredientIds: []
})

const jwtService = new JwtService()
const userDto = fakeUser.toResponse()
const accessToken = jwtService.generateToken({ id: userDto.id, email: userDto.email })

describe('App', () => {
  beforeEach(async () => {
    container = createContainer()
    container.register({
      authenticationController: awilix.asValue(mockAuthenticationController),
      recipeController: awilix.asValue(mockRecipeController),
      ingredientController: awilix.asValue(mockIngredientController)
    })
  })

  afterEach(async () => {
    container.dispose()
  })

  it('should return 200 when login is successful', async () => {
    mockAuthenticationController.login
      .calledWith(any())
      .mockResolvedValue({ user: fakeUser.toResponse(), token: '123' })

    const response = await request(new ExpressApplication(container).app)
      .post('/login/password')
      .set({ origin: 'http://localhost:5173', 'x-api-key': apiKeys[0].key })
      .send({ email: 'testuser@test.com', password: 'testpass' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      user: fakeUser.toResponse(),
      token: '123'
    })
  })

  it('should return 200 when registration is successful', async () => {
    mockAuthenticationController.register.calledWith(any()).mockResolvedValue({
      user: fakeUser.toResponse(),
      token: '123'
    })
    container.register({
      authenticationController: awilix.asValue(mockAuthenticationController)
    })
    const response = await request(new ExpressApplication(container).app)
      .post('/register/password')
      .set({ origin: 'http://localhost:5173', 'x-api-key': apiKeys[0].key })
      .send({ username: 'testuser', password: 'testpass' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      user: fakeUser.toResponse(),
      token: '123'
    })
  })

  it('should return 201 when creating a recipe is successful', async () => {
    mockRecipeController.createRecipe.calledWith(any()).mockResolvedValue(fakeRecipe.toResponse())

    container.register({
      recipeController: awilix.asValue(mockRecipeController)
    })
    const expressApp = new ExpressApplication(container)

    const response = await request(expressApp.app)
      .post('/recipes')
      .set({
        origin: 'http://localhost:5173',
        'x-api-key': apiKeys[0].key,
        'x-access-token': accessToken
      })
      .send({ title: 'Test Recipe', userId: 1 })

    expect(response.body).toEqual(fakeRecipe.toResponse())
    expect(response.status).toBe(201)
  })

  it('should return 200 when updating a recipe is successful', async () => {
    mockRecipeController.updateRecipe.calledWith(any()).mockResolvedValue(fakeRecipe.toResponse())

    container.register({
      recipeController: awilix.asValue(mockRecipeController)
    })

    const response = await request(new ExpressApplication(container).app)
      .patch('/recipes')
      .set({
        origin: 'http://localhost:5173',
        'x-api-key': apiKeys[0].key,
        'x-access-token': accessToken
      })
      .send({ id: 1, title: 'Updated Recipe', userId: 1 })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeRecipe.toResponse())
  })

  it('should return 200 when deleting a recipe is successful', async () => {
    mockRecipeController.deleteRecipe.calledWith(any()).mockResolvedValue()

    container.register({
      recipeController: awilix.asValue(mockRecipeController)
    })

    const response = await request(new ExpressApplication(container).app).delete('/recipes').set({
      origin: 'http://localhost:5173',
      'x-api-key': apiKeys[0].key,
      'x-access-token': accessToken
    })
    expect(response.status).toBe(200)
    expect(response.body).toEqual({})
  })

  it('should return 200 when retrieving personal recipes is successful', async () => {
    mockRecipeController.retrieveAllFromUser
      .calledWith(any())
      .mockResolvedValue([fakeRecipe.toResponse(), fakeRecipe.toResponse()])

    container.register({
      recipeController: awilix.asValue(mockRecipeController)
    })
    const response = await request(new ExpressApplication(container).app)
      .get('/recipes/personal')
      .set({
        origin: 'http://localhost:5173',
        'x-api-key': apiKeys[0].key,
        'x-access-token': accessToken
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual([fakeRecipe.toResponse(), fakeRecipe.toResponse()])
  })

  it('should return 200 when retrieving community recipes is successful', async () => {
    mockRecipeController.retrieveAll.calledWith().mockResolvedValue([fakeRecipe.toResponse()])

    container.register({
      recipeController: awilix.asValue(mockRecipeController)
    })

    const response = await request(new ExpressApplication(container).app)
      .get('/recipes/community')
      .set({
        origin: 'http://localhost:5173',
        'x-api-key': apiKeys[0].key,
        'x-access-token': accessToken
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual([fakeRecipe.toResponse()])
  })

  it('should return 200 when retrieving ingredients is successful', async () => {
    mockIngredientController.retrieveAll
      .calledWith()
      .mockResolvedValue([fakeIngredient.toResponse()])

    container.register({
      ingredientController: awilix.asValue(mockIngredientController)
    })

    const response = await request(new ExpressApplication(container).app).get('/ingredients').set({
      origin: 'http://localhost:5173',
      'x-api-key': apiKeys[0].key,
      'x-access-token': accessToken
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual([fakeIngredient.toResponse()])
  })
  it('should return 200 when creating an ingredient is successful', async () => {
    mockIngredientController.createIngredient
      .calledWith(any())
      .mockResolvedValue(fakeIngredient.toResponse())
    container.register({
      ingredientController: awilix.asValue(mockIngredientController)
    })
    const response = await request(new ExpressApplication(container).app)
      .post('/ingredients')
      .set({
        origin: 'http://localhost:5173',
        'x-api-key': apiKeys[0].key,
        'x-access-token': accessToken
      })
      .send({ name: 'Test Ingredient' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeIngredient.toResponse())
  })

  it('should return 200 when deleting an ingredient is successful', async () => {
    mockIngredientController.deleteIngredient.calledWith(any()).mockResolvedValue({})
    container.register({
      ingredientController: awilix.asValue(mockIngredientController)
    })
    const response = await request(new ExpressApplication(container).app)
      .delete('/ingredients')
      .set({
        origin: 'http://localhost:5173',
        'x-api-key': apiKeys[0].key,
        'x-access-token': accessToken
      })
      .send({ id: 1 })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({})
  })
})
