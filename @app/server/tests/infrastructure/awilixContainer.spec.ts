import { PrismaClient } from '@prisma/client'
import awilix from 'awilix'
import container from '../../src/infrastructure/awilixContainer'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import AuthenticationController from '../../src/application/controllers/AuthenticationController'

describe('Awilix container', () => {
  it('should have a prismaClient registered', () => {
    expect(container.hasRegistration('prismaClient')).toBeTruthy()
    expect(container.resolve('prismaClient')).toBeInstanceOf(PrismaClient)
  })

  it('should load modules from the application folder', async () => {
    // Replace 'exampleController' with the name of one of your actual controllers
    const exampleControllerName = 'authenticationController'

    expect(container.hasRegistration(exampleControllerName)).toBeTruthy()
    const exampleController = container.resolve(exampleControllerName)

    // Replace 'ExampleController' with the name of one of your actual controllers
    expect(exampleController).toBeInstanceOf(AuthenticationController)
  })
})
