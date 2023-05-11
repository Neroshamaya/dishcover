import AuthenticationController from '../../../src/application/controllers/AuthenticationController'
import EmailAuthenticationStrategy from '../../../src/application/strategies/EmailAuthenticationStrategy'
import EmailRegistrationStrategy from '../../../src/application/strategies/EmailRegistrationStrategy'
import UserRepository from '../../../src/application/repositories/UserRepository'
import JwtService from '../../../src/application/services/JwtService'
import { LoginQuery, RegisterQuery } from '@dishcover/shared/types/requests'
import User from '../../../src/domain/models/User'
import Id from '../../../src/domain/valueObjects/Id'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import Email from '../../../src/domain/valueObjects/Email'

describe('AuthenticationController', () => {
  const prismaClient = mockDeep<PrismaClient>()
  const userRepositoryMock = new UserRepository(prismaClient)
  const emailAuthStrategyMock = new EmailAuthenticationStrategy(userRepositoryMock)
  const emailRegStrategyMock = new EmailRegistrationStrategy(userRepositoryMock)
  const jwtServiceMock = new JwtService()

  const authController = new AuthenticationController(
    emailAuthStrategyMock,
    emailRegStrategyMock,
    jwtServiceMock
  )

  const sampleUser = new User({
    id: new Id('645bec31999805ff039c30dd'),
    email: new Email('test@example.com'),
    password: 'hashed-password',
    salt: 'pepper',
    created: new Date(),
    updated: new Date()
  })

  const loginQuery: LoginQuery = {
    email: 'test@example.com',
    password: 'password'
  }

  const registerQuery: RegisterQuery = {
    email: 'test@example.com',
    password: 'password',
    confirmPassword: 'password'
  }

  it('should log in a user', async () => {
    const authStrategySpy = jest
      .spyOn(emailAuthStrategyMock, 'authenticate')
      .mockResolvedValue(sampleUser)
    const jwtServiceSpy = jest.spyOn(jwtServiceMock, 'generateToken')
    const { email, password } = loginQuery
    const result = await authController.login(loginQuery)

    expect(authStrategySpy).toHaveBeenCalledWith(email, password)
    expect(jwtServiceSpy).toHaveBeenCalled()
    expect(result.user).toEqual(sampleUser.toResponse())

    authStrategySpy.mockRestore()
    jwtServiceSpy.mockRestore()
  })

  it('should register a user', async () => {
    const regStrategySpy = jest
      .spyOn(emailRegStrategyMock, 'register')
      .mockResolvedValue(sampleUser)
    const jwtServiceSpy = jest.spyOn(jwtServiceMock, 'generateToken')
    const { email, password } = registerQuery
    const result = await authController.register(registerQuery)

    expect(regStrategySpy).toHaveBeenCalledWith(email, password)
    expect(jwtServiceSpy).toHaveBeenCalled()
    expect(result.user).toEqual(sampleUser.toResponse())

    regStrategySpy.mockRestore()
    jwtServiceSpy.mockRestore()
  })
})
