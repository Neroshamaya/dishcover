import { ZodError, ZodIssue, ZodIssueCode } from 'zod'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

import ValidationError from '../../../src/application/errors/ValidationError'

// Mock ZodError for testing
function createZodError(issues: ZodIssue[]): ZodError {
  const error = new ZodError(issues)
  error.issues = issues
  return error
}

describe('ValidationError', () => {
  it('should create an instance of ValidationError with correct properties', () => {
    const issues: ZodIssue[] = [
      {
        code: ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'number',
        path: ['name'],
        message: 'Expected string, received number'
      },
      {
        code: ZodIssueCode.too_small,
        minimum: 5,
        type: 'string',
        inclusive: true,
        path: ['name'],
        message: 'Name should be at least 5 characters'
      }
    ]

    const zodError = createZodError(issues)
    const validationError = new ValidationError(zodError)

    expect(validationError).toBeInstanceOf(ValidationError)
    expect(validationError.message).toEqual(zodError.toString())
    expect(validationError.status).toEqual(400)
    expect(validationError.code).toEqual('ValidationError')
    expect(validationError.details).toEqual([
      {
        fields: ['name'],
        message: 'Expected string, received number'
      },
      {
        fields: ['name'],
        message: 'Name should be at least 5 characters'
      }
    ])
  })
})
