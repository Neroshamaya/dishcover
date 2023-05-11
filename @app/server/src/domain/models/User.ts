import Prisma, { Prisma as PrismaClass } from '@prisma/client'

import Email from '../valueObjects/Email'
import Id from '../valueObjects/Id'
import { LoginQuery, RegisterQuery } from '@dishcover/shared/types/requests'
import { LoginResponseBody } from '@dishcover/shared/types/responses'
import { UserDtoType } from '@dishcover/shared/types/resources'

interface UserParams {
  id?: Id
  email: Email
  salt: string
  password: string
  created?: Date | null
  updated?: Date | null
}

export default class User {
  readonly id?: Id
  readonly email: Email
  readonly salt: string
  readonly password: string
  readonly created?: Date | null
  readonly updated?: Date | null
  constructor({ id, email, salt, password, created, updated }: UserParams) {
    this.id = id
    this.email = email
    this.salt = salt
    this.password = password
    this.created = created
    this.updated = updated
  }

  static fromPrisma(prismaUser: Prisma.User): User {
    return new User({
      id: new Id(prismaUser.id),
      created: prismaUser.created as Date,
      email: new Email(prismaUser.email as string),
      salt: prismaUser.salt as string,
      password: prismaUser.password as string,
      updated: prismaUser.updated as Date
    })
  }

  toResponse(): UserDtoType {
    return {
      id: this.id?.value as string,
      email: this.email.value
    }
  }

  toPrismaCreate(): PrismaClass.UserCreateInput {
    return {
      email: this.email.value,
      salt: this.salt,
      password: this.password
    }
  }
  toPrismaUpdate(): PrismaClass.UserUpdateInput {
    return {
      email: this.email.value,
      salt: this.salt,
      password: this.password
    }
  }
  toPrismaDelete(): PrismaClass.UserDeleteArgs {
    return {
      where: { id: this.id?.value }
    }
  }
}
