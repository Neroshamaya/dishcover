import request from 'supertest'
import express, { Express } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import Id from '../../../src/domain/valueObjects/Id'
import { Prisma } from '@prisma/client'
import AuthenticationController from '../../../src/application/controllers/AuthenticationController'
import RecipeController from '../../../src/application/controllers/RecipeController'
import IngredientController from '../../../src/application/controllers/IngredientController'
import { errorHandler } from '../../../src/infrastructure/expressMiddlewares/errorHandler'
import { localHostDynamicOrigin } from '../../../src/infrastructure/corsOrigin'
import { apiKeyVerification } from '../../../src/infrastructure/expressMiddlewares/apiKeyVerification'
import { jwtVerification } from '../../../src/infrastructure/expressMiddlewares/jwtVerification'
import logRequest from '../../../src/infrastructure/expressMiddlewares/logRequest'
import container from '../../../src/infrastructure/awilixContainer'
import Email from '../../../src/domain/valueObjects/Email'
import User from '../../../src/domain/models/User'
import Recipe from '../../../src/domain/models/Recipe'
import Ingredient from '../../../src/domain/models/Ingredient'

jest.mock('../../../src/application/controllers/AuthenticationController')
jest.mock('../../../src/application/controllers/RecipeController')
jest.mock('../../../src/application/controllers/IngredientController')

import UniqueConstraintError from '../../../src/application/errors/UniqueConstraintError'

const authenticationController = container.resolve(
  'authenticationController'
) as jest.Mocked<AuthenticationController>
const recipeController = container.resolve('recipeController') as jest.Mocked<RecipeController>

const ingredientController = container.resolve(
  'ingredientController'
) as jest.Mocked<IngredientController>

// Mock Prisma.PrismaClientKnownRequestError for testing
function createPrismaClientKnownRequestError(target: string): Prisma.PrismaClientKnownRequestError {
  const error = new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
    code: 'P2002',
    clientVersion: '6.6.6',
    meta: { target }
  })
  return error
}

describe('UniqueConstraintError', () => {
  it('should create an instance of UniqueConstraintError with correct properties', () => {
    const target = 'user_email'
    const prismaError = createPrismaClientKnownRequestError(target)

    const uniqueConstraintError = new UniqueConstraintError(prismaError)

    expect(uniqueConstraintError).toBeInstanceOf(UniqueConstraintError)
    expect(uniqueConstraintError.message).toEqual(prismaError.message)
    expect(uniqueConstraintError.status).toEqual(400)
    expect(uniqueConstraintError.code).toEqual('UniqueConstraintError')

    const field = target.split('_')[1]
    expect(uniqueConstraintError.details).toEqual([
      {
        fields: [field],
        message: `${field} is already taken`
      }
    ])
  })
})
