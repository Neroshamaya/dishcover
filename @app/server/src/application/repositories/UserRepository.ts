import { LoginQuery } from '@dishcover/shared/types/requests'
import { Prisma, PrismaClient } from '@prisma/client'

import { IUserRepository } from '@/domain/types/repository/IUserRepository'
import UniqueConstraintError from '../errors/UniqueConstraintError'
import { PrismaUserToModel } from './adapters/prisma/entities/PrismaUserToModel'
import { UserCreateToPrismaAdapter } from './adapters/prisma/query/user/UserCreateToPrismaAdapter'
import { UserFindOneToPrismaAdapter } from './adapters/prisma/query/user/UserFindOneToPrismaAdapter'
export default class UserRepository implements IUserRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getUserByEmail(query: LoginQuery) {
    const user = await this.prismaClient.user.findUnique(UserFindOneToPrismaAdapter.adapt(query))
    return user ? PrismaUserToModel.adapt(user) : null
  }

  async createUser(query: { email: string; password: string; salt: string }) {
    try {
      const prismaUser = await this.prismaClient.user.create(UserCreateToPrismaAdapter.adapt(query))
      return PrismaUserToModel.adapt(prismaUser)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UniqueConstraintError(error)
      }
      throw error
    }
  }
}
