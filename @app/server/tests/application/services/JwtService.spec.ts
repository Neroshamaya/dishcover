import jwt from 'jsonwebtoken'
import JwtService from '../../../src/application/services/JwtService'

// You'll need to import the tokenSecret from your configuration
import { tokenSecret } from '../../../src/infrastructure/configuration'

// If using Jest, you can use these imports for better test syntax
import { expect, describe, it } from '@jest/globals'

describe('JwtService', () => {
  const jwtService = new JwtService()

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const payload = { userId: 'test-user-id' }
      const token = jwtService.generateToken(payload)

      expect(typeof token).toBe('string')

      const decodedPayload = jwt.verify(token, tokenSecret) as Record<string, unknown>
      expect(decodedPayload).toMatchObject(payload)
    })
  })

  describe('decodeToken', () => {
    it('should decode a valid JWT token', () => {
      const payload = { userId: 'test-user-id' }
      const token = jwt.sign(payload, tokenSecret)

      const decodedPayload = jwtService.decodeToken(token) as Record<string, unknown>
      expect(decodedPayload).toMatchObject(payload)
    })

    it('should throw an error for an invalid token', () => {
      const invalidToken = 'invalid-token'
      expect(() => {
        jwtService.decodeToken(invalidToken)
      }).toThrow()
    })
  })
})
