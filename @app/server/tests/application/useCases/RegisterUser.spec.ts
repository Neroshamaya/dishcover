import { RegisterUser } from '../../../src/application/useCases/RegisterUser'
import { IRegistrationStrategy } from '../../../src/domain/types/strategy/IRegistrationStrategy'
import User from '../../../src/domain/models/User'
import { mockDeep, DeepMockProxy, any } from 'jest-mock-extended'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import EmailRegistrationStrategy from '../../../src/application/strategies/EmailRegistrationStrategy'
import Id from '../../../src/domain/valueObjects/Id'
import Email from '../../../src/domain/valueObjects/Email'
// Mock the IRegistrationStrategy
const registrationStrategyMock = mockDeep<EmailRegistrationStrategy>()

describe('RegisterUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('should register a user with email and password', async () => {
      const email = 'test@example.com'
      const password = 'password'
      const user = new User({
        id: new Id('645bfcc71ba3dde37afdeadb'),
        email: new Email('new@example.com'),
        password: 'password',
        salt: 'pepper'
      })

      registrationStrategyMock.register.calledWith(email, password).mockResolvedValue(user)

      const registerUser = new RegisterUser(registrationStrategyMock)

      const registeredUser = await registerUser.execute({ email, password })

      expect(registeredUser).toEqual(user)
      expect(registrationStrategyMock.register).toHaveBeenCalledWith(email, password)
    })
  })
})
