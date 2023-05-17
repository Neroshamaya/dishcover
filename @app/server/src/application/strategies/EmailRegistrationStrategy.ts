import { RegisterQuery } from '@dishcover/shared/types/requests'
import bcrypt from 'bcrypt'

import User from '@/domain/models/User'
import type { IRegistrationStrategy } from '@/domain/types/strategy/IRegistrationStrategy'
import UserRepository from '../repositories/UserRepository'

export default class EmailRegistrationStrategy implements IRegistrationStrategy {
  constructor(private userRepository: UserRepository) {}

  async register(query: RegisterQuery): Promise<User> {
    const { email, password } = query
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    const insertedUser = await this.userRepository.createUser({
      email,
      password: hashedPassword,
      salt
    })
    return insertedUser
  }
}
