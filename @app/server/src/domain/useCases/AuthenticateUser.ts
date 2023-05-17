import type { LoginQuery } from '@dishcover/shared/types/requests/Authentication'

import type UseCase from '../types/IUseCase'
import type { Ipresenter } from '../types/IPresenter'
import { IAuthenticationStrategy } from '../types/strategy/IAuthenticationStrategy'
import { LoginResponse } from '@dishcover/shared/types/responses/Authentication'
import { IJwtService } from '@/domain/types/IJwtService'
import User from '@/domain/models/User'

export interface AuthenticateUserExecResponse {
  user: User
  token: string
}

export class AuthenticateUser implements UseCase<LoginQuery, LoginResponse> {
  constructor(
    private authenticationStrategy: IAuthenticationStrategy,
    private presenter: Ipresenter<AuthenticateUserExecResponse, LoginResponse>,
    private jwtService: IJwtService
  ) {}

  async execute(query: LoginQuery): Promise<LoginResponse> {
    const user = await this.authenticationStrategy.authenticate(query)
    const token = this.jwtService.generateToken({
      email: user.email.value,
      id: user.id?.value
    })
    return this.presenter.present({ user, token })
  }
}
