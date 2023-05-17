import type { LoginQuery } from '@dishcover/shared/types/requests/Authentication'

import User from '../models/User'
import { IRegistrationStrategy } from '../types/strategy/IRegistrationStrategy'
import type UseCase from '../types/IUseCase'
import { IJwtService } from '@/domain/types/IJwtService'
import { RegisterQuery } from '@dishcover/shared/types/requests'
import { RegisterResponse } from '@dishcover/shared/types/responses'
import { Ipresenter } from '@/domain/types/IPresenter'

export interface RegisterUserResponse {
  user: User
  token: string
}

export class RegisterUser implements UseCase<RegisterQuery, RegisterResponse> {
  constructor(
    private registrationStrategy: IRegistrationStrategy,
    private presenter: Ipresenter<RegisterUserResponse, RegisterResponse>,
    private jwtService: IJwtService
  ) {}

  async execute(query: { email: string; password: string }): Promise<RegisterResponse> {
    const user = await this.registrationStrategy.register(query)
    const token = this.jwtService.generateToken({
      email: user.email.value,
      id: user.id?.value
    })
    return this.presenter.present({ user, token })
  }
}
