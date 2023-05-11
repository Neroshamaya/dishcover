import bcrypt from 'bcrypt'

import User from '../../domain/models/User'
import type { IRegistrationStrategy } from '../../domain/types/strategy/IRegistrationStrategy'
import Email from '../../domain/valueObjects/Email'
import UserRepository from '../repositories/UserRepository'

export default class EmailRegistrationStrategy implements IRegistrationStrategy {
  constructor(private userRepository: UserRepository) {}

  async register(email: string, password: string): Promise<User> {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({ salt, password: hashedPassword, email: new Email(email) })
    const insertedUser = await this.userRepository.createUser(user)
    return insertedUser
  }
}
