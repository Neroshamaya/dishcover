import { RegisterQuery } from '@dishcover/shared/types/requests'
import { RegisterResponse } from '@dishcover/shared/types/responses'

import { IJwtService } from '@/domain/types/IJwtService'
import { Ipresenter } from '@/domain/types/IPresenter'

import User from '../models/User'
import type UseCase from '../types/IUseCase'
import { IRegistrationStrategy } from '../types/strategy/IRegistrationStrategy'

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
