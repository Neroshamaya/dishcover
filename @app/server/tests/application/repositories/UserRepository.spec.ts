import { PrismaClient, Prisma } from '@prisma/client'
import UserRepository from '../../../src/application/repositories/UserRepository'
import User from '../../../src/domain/models/User'
import UniqueConstraintError from '../../../src/application/errors/UniqueConstraintError'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import Id from '../../../src/domain/valueObjects/Id'
import Email from '../../../src/domain/valueObjects/Email'

// Mock PrismaClient
const prismaClient: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>()
const userRepository = new UserRepository(prismaClient)

describe('UserRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getUserByEmail', () => {
    it('should return a user when a user with the given email exists', async () => {
      const testEmail = 'test@example.com'

      prismaClient.user.findUnique.calledWith(any()).mockResolvedValue({
        id: '645bf6ec15584c542125e3a4',
        email: testEmail,
        password: 'password-hash',
        salt: 'pepper',
        created: new Date(),
        updated: new Date()
      })

      const user = await userRepository.getUserByEmail(testEmail)

      expect(user).toBeInstanceOf(User)
      expect(user?.email.value).toEqual(testEmail)
    })

    it('should return null when no user with the given email exists', async () => {
      const testEmail = 'test@example.com'

      prismaClient.user.findUnique.calledWith(any()).mockResolvedValue(null)

      const user = await userRepository.getUserByEmail(testEmail)

      expect(user).toBeNull()
    })
  })

  describe('createUser', () => {
    it('should create a new user and return it', async () => {
      const newUser = new User({
        id: new Id('645bf73ad97d21dc77453252'),
        email: new Email('new@example.com'),
        password: 'password-hash',
        salt: 'pepper'
      })

      prismaClient.user.create.calledWith(any()).mockResolvedValue({
        id: '645bf5bf609125150af61579',
        email: 'new@example.com',
        password: 'password-hash',
        salt: 'pepper',
        created: new Date(),
        updated: new Date()
      })

      const createdUser = await userRepository.createUser(newUser)

      expect(createdUser).toBeInstanceOf(User)
      expect(createdUser.email.value).toEqual(newUser.email.value)
    })

    it('should throw a UniqueConstraintError when a user with the same email already exists', async () => {
      const duplicateUser = new User({
        id: new Id('645bf6ec15584c542125e3a4'),
        email: new Email('new@example.com'),
        password: 'password-hash',
        salt: 'pepper'
      })

      prismaClient.user.create.calledWith(any()).mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
          code: 'P2002',
          clientVersion: '6.6.6',
          meta: { target: '' }
        })
      )

      await expect(userRepository.createUser(duplicateUser)).rejects.toThrow(UniqueConstraintError)
    })
  })
})
