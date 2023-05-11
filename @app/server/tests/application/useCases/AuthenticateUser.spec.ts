import { AuthenticateUser } from '../../../src/application/useCases/AuthenticateUser'
import { IAuthenticationStrategy } from '../../../src/domain/types/strategy/IAuthenticationStrategy'
import User from '../../../src/domain/models/User'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import Id from '../../../src/domain/valueObjects/Id'
import Email from '../../../src/domain/valueObjects/Email'
import EmailAuthenticationStrategy from '../../../src/application/strategies/EmailAuthenticationStrategy'

// Mock the IAuthenticationStrategy
const authenticationStrategyMock = mockDeep<EmailAuthenticationStrategy>()

describe('AuthenticateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should authenticate a user with email and password', async () => {
      const email = 'test@example.com'
      const password = 'password'
      const user = new User({
        id: new Id('645bfcc71ba3dde37afdeadb'),
        email: new Email('new@example.com'),
        password: 'password',
        salt: 'pepper'
      })

      authenticationStrategyMock.authenticate.calledWith(any(), any()).mockResolvedValue(user)

      const authenticateUser = new AuthenticateUser(authenticationStrategyMock)

      const authenticatedUser = await authenticateUser.execute({ email, password })

      expect(authenticatedUser).toEqual(user)
      expect(authenticationStrategyMock.authenticate).toHaveBeenCalledWith(email, password)
    })
  })
})
