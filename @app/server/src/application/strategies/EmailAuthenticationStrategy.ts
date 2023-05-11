import bcrypt from 'bcrypt'

import User from '../../domain/models/User'
import type { IAuthenticationStrategy } from '../../domain/types/strategy/IAuthenticationStrategy'
import WrongEmailPasswordComboError from '../errors/WrongEmailPasswordComboError'
import UserRepository from '../repositories/UserRepository'

export default class EmailAuthenticationStrategy implements IAuthenticationStrategy {
  constructor(private userRepository: UserRepository) {}
  async authenticate(email: string, password: string): Promise<never | User> {
    const user = await this.userRepository.getUserByEmail(email)
    if (!user) {
      throw new WrongEmailPasswordComboError(new Error('Wrong email password combination'))
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (passwordsMatch) {
      return user
    } else {
      throw new WrongEmailPasswordComboError(new Error('Wrong email password combination'))
    }
  }
}
