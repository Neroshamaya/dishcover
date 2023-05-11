import { Prisma, PrismaClient } from '@prisma/client'

import User from '../../domain/models/User'
import { IUserRepository } from '../../domain/types/repository/IUserRepository'
import UniqueConstraintError from '../errors/UniqueConstraintError'

export default class UserRepository implements IUserRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email
      }
    })
    return user ? User.fromPrisma(user) : null
  }

  async createUser(user: User): Promise<User | never> {
    try {
      const prismaUser = await this.prismaClient.user.create({ data: user.toPrismaCreate() })
      return User.fromPrisma(prismaUser)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UniqueConstraintError(error)
      }
      throw error
    }
  }
}
