import { Prisma, PrismaClient } from '@prisma/client'

import User from '../../domain/models/User'
import { IUserRepository } from '../../domain/types/repository/IUserRepository'
import UniqueConstraintError from '../errors/UniqueConstraintError'
import Email from '@/domain/valueObjects/Email'
import { LoginQuery, RegisterQuery } from '@dishcover/shared/types/requests'
import { UserFindOneToPrismaAdapter } from './adapters/prisma/query/user/UserFindOneToPrismaAdapter'
import { UserCreateToPrismaAdapter } from './adapters/prisma/query/user/UserCreateToPrismaAdapter'
import { PrismaUserToModel } from './adapters/prisma/entities/PrismaUserToModel'
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
