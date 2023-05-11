import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

jest.mock('dotenv')
describe('Configuration', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should load the correct port from the environment variable', () => {
    process.env.WEBSERVER_PORT = '4000'

    const { port: testPort } = require('../../src/infrastructure/configuration')

    expect(testPort).toBe('4000')
  })

  it('should use the default port if the environment variable is not set', () => {
    delete process.env.WEBSERVER_PORT

    const { port: testPort } = require('../../src/infrastructure/configuration')

    expect(testPort).toBe(3001)
  })

  it('should load the tokenSecret from the environment variable', () => {
    process.env.TOKEN_SECRET = 'test-secret'

    const { tokenSecret: testTokenSecret } = require('../../src/infrastructure/configuration')

    expect(testTokenSecret).toBe('test-secret')
  })

  it('should use the default tokenSecret if the environment variable is not set', () => {
    delete process.env.TOKEN_SECRET

    const { tokenSecret: testTokenSecret } = require('../../src/infrastructure/configuration')

    expect(testTokenSecret).toBe('')
  })
})
