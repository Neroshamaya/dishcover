import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http'
import { Request, Response, NextFunction } from 'express'
import { apiKeyVerification } from '../../../src/infrastructure/expressMiddlewares/apiKeyVerification'
import apiKeys from '../../../src/infrastructure/security/apiKeys'

let response: MockResponse<Response>

describe('apiKeyVerification middleware', () => {
  const mockNext = () => jest.fn() as NextFunction

  it('should return 401 if no API key is provided', () => {
    const req = createRequest({})
    const res = createResponse({ req })
    const next = mockNext()
    const statusSpy = jest.spyOn(res, 'status')
    const sendSpy = jest.spyOn(res, 'send')
    apiKeyVerification(req, res, next)

    expect(statusSpy).toHaveBeenCalledWith(401)
    expect(sendSpy).toHaveBeenCalledWith('Unauthorized')
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if an invalid API key is provided', () => {
    const req = createRequest({
      headers: {
        'x-api-key': 'invalid'
      }
    })
    const res = createResponse({ req })
    const statusSpy = jest.spyOn(res, 'status')
    const sendSpy = jest.spyOn(res, 'send')
    const next = mockNext()

    apiKeyVerification(req, res, next)

    expect(statusSpy).toHaveBeenCalledWith(401)
    expect(sendSpy).toHaveBeenCalledWith('Unauthorized')
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next if a valid API key is provided', () => {
    const validApiKey = apiKeys[0].key
    const req = createRequest({
      headers: {
        'x-api-key': validApiKey
      }
    })
    const res = createResponse({ req })
    const next = mockNext()
    const statusSpy = jest.spyOn(res, 'status')
    const sendSpy = jest.spyOn(res, 'send')
    apiKeyVerification(req, res, next)

    expect(statusSpy).not.toHaveBeenCalled()
    expect(sendSpy).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
