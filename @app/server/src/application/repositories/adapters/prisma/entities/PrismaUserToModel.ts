import { User as PrismaUser } from '@prisma/client'

import Id from '@/domain/valueObjects/Id'
Id
import User from '@/domain/models/User'
import Email from '@/domain/valueObjects/Email'

export class PrismaUserToModel {
  static adapt(prismaUser: PrismaUser): User {
    {
      return new User({
        id: new Id(prismaUser.id),
        created: prismaUser.created as Date,
        email: new Email(prismaUser.email as string),
        salt: prismaUser.salt as string,
        password: prismaUser.password as string,
        updated: prismaUser.updated as Date
      })
    }
  }
}
