import { IUniqueConstraintError } from '@dishcover/shared/types/Errors'
import { Field, Query } from '@dishcover/shared/types/requests'
import { Prisma } from '@prisma/client'

export default class UniqueConstraintError extends Error implements IUniqueConstraintError {
  status = 400
  details
  code
  constructor(error: Prisma.PrismaClientKnownRequestError) {
    super(error.message)
    const field = (error?.meta?.target as string).split('_')[1]
    this.details = [
      {
        fields: [field as Field<Query>],
        message: `${field} is already taken`
      }
    ]
    this.code = 'UniqueConstraintError' as const
  }
}
