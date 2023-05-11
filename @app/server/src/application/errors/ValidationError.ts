import { IValidationError } from '@dishcover/shared'
import { Field, Query } from '@dishcover/shared/types/requests'
import { ZodError } from 'zod'

export default class ValidationError extends Error implements IValidationError {
  status = 400
  details
  code
  constructor(error: ZodError) {
    super(error.message)
    this.message = error.toString()

    this.details = error.issues.map((i) => ({
      fields: i.path as unknown as Field<Query>[],
      message: i.message
    }))
    this.code = 'ValidationError' as const
  }
}
