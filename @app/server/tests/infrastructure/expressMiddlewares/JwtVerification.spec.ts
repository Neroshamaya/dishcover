import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http'

import { jwtVerification } from '../../../src/infrastructure/expressMiddlewares/jwtVerification'
import { tokenSecret } from '../../../src/infrastructure/configuration'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

describe('jwtVerification middleware', () => {
  const mockRequest = (token: string | undefined) =>
    createRequest({
      headers: {
        'x-access-token': token
      },
      app: { locals: {} }
    }) as Request as Request

  const mockResponse = () => {
    return createResponse()
  }

  const mockNext = () => jest.fn() as NextFunction

  it('should return 401 if no access token is provided', () => {
    const req = mockRequest(undefined)
    const res = mockResponse()
    const next = mockNext()
    const statusSpy = jest.spyOn(res, 'status')
    const sendSpy = jest.spyOn(res, 'send')
    jwtVerification(req, res, next)

    expect(statusSpy).toHaveBeenCalledWith(401)
    expect(sendSpy).toHaveBeenCalledWith('Unauthorized')
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if an invalid access token is provided', () => {
    const req = mockRequest('invalid-access-token')
    const res = mockResponse()
    const next = mockNext()
    const statusSpy = jest.spyOn(res, 'status')
    const sendSpy = jest.spyOn(res, 'send')
    jwtVerification(req, res, next)

    expect(statusSpy).toHaveBeenCalledWith(401)
    expect(sendSpy).toHaveBeenCalledWith('Unauthorized')
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next and set userId in app.locals if a valid access token is provided', () => {
    const payload = {
      email: 'test@example.com',
      id: 'user-id',
      iat: Math.floor(Date.now() / 1000)
    }
    const validAccessToken = jwt.sign(payload, tokenSecret)
    const req = mockRequest(validAccessToken)
    const res = mockResponse()
    const next = mockNext()
    const statusSpy = jest.spyOn(res, 'status')
    const sendSpy = jest.spyOn(res, 'send')
    jwtVerification(req, res, next)
    expect(statusSpy).not.toHaveBeenCalled()
    expect(sendSpy).not.toHaveBeenCalled()
    expect(req.app.locals['userId']).toBe(payload.id)
    expect(next).toHaveBeenCalled()
  })
})
