import type { LoginQuery } from '@dishcover/shared/types/requests/Authentication'

import User from '../../domain/models/User'
import type UseCase from '../../domain/types/IUseCase'
import { IAuthenticationStrategy } from '../../domain/types/strategy/IAuthenticationStrategy'

export class AuthenticateUser<OutputType = User> implements UseCase<LoginQuery> {
  constructor(private authenticationStrategy: IAuthenticationStrategy) {}

  async execute(query: { email: string; password: string }): Promise<OutputType | User> {
    const { email, password } = query
    return await this.authenticationStrategy.authenticate(email, password)
  }
}
