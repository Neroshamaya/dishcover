import express from 'express'
import request from 'supertest'
import middlewareLogger from '../../../src/infrastructure/expressMiddlewares/logRequest'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

describe('middlewareLogger', () => {
  let app: express.Express
  let consoleLogSpy: ReturnType<typeof jest.spyOn>
  beforeEach(() => {
    app = express()
    app.use(express.json())
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore the original console.log after each test
    consoleLogSpy.mockRestore()
  })

  it('logs request information', async () => {
    app.use(middlewareLogger)

    await request(app)
      .get('/api/users/123')
      .set('Authorization', 'Bearer fake-token')
      .set('Accept', 'application/json')

    // Check that the log messages were printed as expected
    expect(consoleLogSpy).toHaveBeenCalledWith('-----')
    expect(consoleLogSpy).toHaveBeenCalledWith('GET /api/users/123')
    expect(consoleLogSpy).toHaveBeenCalledWith('Request Info:')
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"authorization": "Bearer fake-token"')
    )
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"accept": "application/json"')
    )
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Params: {}'))
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Body: {}'))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
