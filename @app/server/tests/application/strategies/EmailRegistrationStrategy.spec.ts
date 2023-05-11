import bcrypt from 'bcrypt'
import User from '../../../src/domain/models/User'
import EmailRegistrationStrategy from '../../../src/application/strategies/EmailRegistrationStrategy'
import UserRepository from '../../../src/application/repositories/UserRepository'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import Id from '../../../src/domain/valueObjects/Id'
import Email from '../../../src/domain/valueObjects/Email'

// Mock the UserRepository

const userRepositoryMock = mockDeep<UserRepository>()

// Create an instance of the EmailRegistrationStrategy
const emailRegistrationStrategy = new EmailRegistrationStrategy(userRepositoryMock)

describe('EmailRegistrationStrategy', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('should register a user with an email and password', async () => {
      const email = 'test@example.com'
      const password = 'password'

      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(password, salt)

      const user = new User({ salt, password: hashedPassword, email: new Email(email) })

      userRepositoryMock.createUser
        .calledWith(any())
        .mockImplementation((user) => Promise.resolve(user))

      const registeredUser = await emailRegistrationStrategy.register(email, password)
      expect(bcrypt.compare(password, registeredUser.password)).resolves.toBeTruthy()
    })
  })
})
