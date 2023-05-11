import { port, tokenSecret } from '../../../src/infrastructure/configuration'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import apiKeys from '../../../src/infrastructure/security/apiKeys'

describe('API keys', () => {
  it('should contain at least one API key', () => {
    expect(apiKeys.length).toBeGreaterThan(0)
  })

  it('should have the correct structure', () => {
    apiKeys.forEach((apiKey) => {
      expect(apiKey).toHaveProperty('name')
      expect(apiKey).toHaveProperty('key')
      expect(typeof apiKey.name).toBe('string')
      expect(typeof apiKey.key).toBe('string')
    })
  })

  // If you want to test a specific API key, you can use the following test case:
  it('should contain the expected API key', () => {
    const expectedApiKey = {
      name: 'dishcover-front',
      key: 'rEiwIw21xN9jTYN9jqyBqV5Vj1TMc7JGWKa9n40EMSaEUJtDtKvfk52JSJ3XDAgXhHEmPVBEIVQ4xEfj2eyvE5xFQ7a79sFtEX1PDafQ5piIhnUj0plcwUnFoUP88rUF'
    }

    const foundApiKey = apiKeys.find(
      (apiKey) => apiKey.name === expectedApiKey.name && apiKey.key === expectedApiKey.key
    )

    expect(foundApiKey).toBeDefined()
  })
})
