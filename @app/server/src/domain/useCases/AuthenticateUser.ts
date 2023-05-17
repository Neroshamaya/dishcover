import type { LoginQuery } from '@dishcover/shared/types/requests/Authentication'
import { LoginResponse } from '@dishcover/shared/types/responses/Authentication'

import User from '@/domain/models/User'
import { IJwtService } from '@/domain/types/IJwtService'

import type { Ipresenter } from '../types/IPresenter'
import type UseCase from '../types/IUseCase'
import { IAuthenticationStrategy } from '../types/strategy/IAuthenticationStrategy'

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
