import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export default class UniqueConstraintError implements Error {
  public name = 'UniqueConstraintError'
  public status = 400
  public message
  public details
  constructor(error: Prisma.PrismaClientKnownRequestError) {
    console.error(error)
    this.message = error.code
    const target = error?.meta?.target as string
    this.details = {
      field: target.split('_')[1]
    }
  }
}
