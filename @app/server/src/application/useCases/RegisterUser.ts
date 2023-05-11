import type { LoginQuery } from '@dishcover/shared/types/requests/Authentication'

import User from '../../domain/models/User'
import { IRegistrationStrategy } from '../../domain/types/strategy/IRegistrationStrategy'
import type UseCase from '../../domain/types/IUseCase'

export class RegisterUser<OutputType = User> implements UseCase<LoginQuery> {
  constructor(private registrationStrategy: IRegistrationStrategy) {}

  async execute(query: { email: string; password: string }): Promise<OutputType | User> {
    const { email, password } = query
    return await this.registrationStrategy.register(email, password)
  }
}
