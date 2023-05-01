import { ZodError } from 'zod'

export default class ValidationError implements Error {
  public name = 'ValidationError'
  public status = 400
  public message
  constructor(error: ZodError) {
    this.message = JSON.stringify(error.issues.map((m) => ({ fields: m.path, message: m.message })))
  }
}
