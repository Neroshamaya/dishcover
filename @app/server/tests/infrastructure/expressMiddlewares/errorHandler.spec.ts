import { Request, Response, NextFunction } from 'express'
import { errorHandler } from '../../../src/infrastructure/expressMiddlewares/errorHandler'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http'

describe('errorHandler middleware', () => {
  const mockRequest = () => ({} as Request)

  const mockResponse = () => {
    const res = createResponse({}) as Response
    res.headersSent = false
    res.status = jest.fn(() => res).mockReturnValue(res)
    res.json = jest.fn(() => res).mockReturnValue(res)
    return res
  }
  const mockNext = () => jest.fn() as NextFunction

  it('should use default status 500 when error status is not provided', () => {
    const req = mockRequest()
    const res = mockResponse()
    const next = mockNext()
    const error = { message: 'Internal Server Error' }

    errorHandler(error as any, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(error)
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next when headers are already sent', () => {
    const req = mockRequest()
    const res = mockResponse()
    res.headersSent = true
    const next = mockNext()
    const error = { status: 400, message: 'Bad Request' }

    errorHandler(error as any, req, res, next)

    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(error)
  })
})
