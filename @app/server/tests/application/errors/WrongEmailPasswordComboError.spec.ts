import WrongEmailPasswordComboError from '../../../src/application/errors/WrongEmailPasswordComboError'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

describe('WrongEmailPasswordComboError', () => {
  it('should create an instance of WrongEmailPasswordComboError with correct properties', () => {
    const originalError = new Error('Authentication failed')
    const wrongEmailPasswordComboError = new WrongEmailPasswordComboError(originalError)

    expect(wrongEmailPasswordComboError).toBeInstanceOf(WrongEmailPasswordComboError)
    expect(wrongEmailPasswordComboError.message).toEqual(originalError.message)
    expect(wrongEmailPasswordComboError.status).toEqual(401)
    expect(wrongEmailPasswordComboError.code).toEqual('WrongEmailPasswordComboError')

    expect(wrongEmailPasswordComboError.details).toEqual([
      {
        fields: ['email', 'password'],
        message: 'wrong email or password'
      }
    ])
  })
})
