import bcrypt from 'bcrypt'

import User from '../../../src/domain/models/User'
import EmailAuthenticationStrategy from '../../../src/application/strategies/EmailAuthenticationStrategy'
import UserRepository from '../../../src/application/repositories/UserRepository'
import WrongEmailPasswordComboError from '../../../src/application/errors/WrongEmailPasswordComboError'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import Id from '../../../src/domain/valueObjects/Id'
import Email from '../../../src/domain/valueObjects/Email'

// Mock the UserRepository

const userRepositoryMock = mockDeep<UserRepository>()

// Create an instance of the EmailAuthenticationStrategy
const emailAuthenticationStrategy = new EmailAuthenticationStrategy(userRepositoryMock)

describe('EmailAuthenticationStrategy', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('authenticate', () => {
    it('should authenticate a user with the correct email and password', async () => {
      const email = 'test@example.com'
      const password = 'password'
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = new User({
        id: new Id('645bfcc71ba3dde37afdeadb'),
        email: new Email('new@example.com'),
        password: hashedPassword,
        salt: 'pepper'
      })

      userRepositoryMock.getUserByEmail.calledWith(any()).mockResolvedValue(user)

      const authenticatedUser = await emailAuthenticationStrategy.authenticate(email, password)

      expect(authenticatedUser).toEqual(user)
      expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(email)
    })

    it('should throw a WrongEmailPasswordComboError when the email is incorrect', async () => {
      const email = 'test@example.com'
      const password = 'password'

      userRepositoryMock.getUserByEmail.calledWith(any()).mockResolvedValue(null)

      await expect(emailAuthenticationStrategy.authenticate(email, password)).rejects.toThrow(
        WrongEmailPasswordComboError
      )
      expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(email)
    })

    it('should throw a WrongEmailPasswordComboError when the password is incorrect', async () => {
      const email = 'test@example.com'
      const password = 'password'
      const wrongPassword = 'wrong-password'
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = new User({
        id: new Id('645bfcc71ba3dde37afdeadb'),
        email: new Email('new@example.com'),
        password: hashedPassword,
        salt: 'pepper'
      })

      userRepositoryMock.getUserByEmail.calledWith(any()).mockResolvedValue(user)

      await expect(emailAuthenticationStrategy.authenticate(email, wrongPassword)).rejects.toThrow(
        WrongEmailPasswordComboError
      )
      expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(email)
    })
  })
})
