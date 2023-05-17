import Prisma, { Prisma as PrismaClass } from '@prisma/client'

import Email from '../valueObjects/Email'
import Id from '../valueObjects/Id'
import { LoginQuery, RegisterQuery } from '@dishcover/shared/types/requests'
import { UserDtoType } from '@dishcover/shared/types/resources'

interface UserParams {
  id: Id
  email: Email
  salt: string
  password: string
  created: Date
  updated: Date
}

export default class User {
  readonly id: Id
  readonly email: Email
  readonly salt: string
  readonly password: string
  readonly created: Date | null
  readonly updated: Date | null
  constructor({ id, email, salt, password, created, updated }: UserParams) {
    this.id = id
    this.email = email
    this.salt = salt
    this.password = password
    this.created = created
    this.updated = updated
  }
}
