import { IUserRepository } from '../../domain/types/IUserRepository'
import { User } from '../../domain/models/User'
import { Prisma, PrismaClient } from '@prisma/client'
import UniqueConstraintError from '../errors/UniqueConstraintError'

export default class UserRepository implements IUserRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email
      }
    })
    return user ? new User(user) : null
  }

  async createUser(user: User): Promise<User | never> {
    try {
      const prismaUser = await this.prismaClient.user.create({ data: user.getDto() })
      return new User(prismaUser)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UniqueConstraintError(error)
      }
      throw error
    }
  }
}
