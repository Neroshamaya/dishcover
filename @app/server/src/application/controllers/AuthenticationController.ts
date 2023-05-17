import {
  LoginQuerySchema,
  RegisterQuerySchema
} from '@dishcover/shared/schemas/requests/Authentication'

import { AuthenticateUser } from '@/domain/useCases/AuthenticateUser'
import { RegisterUser } from '@/domain/useCases/RegisterUser'
import ValidationError from '../errors/ValidationError'
import { AuthenticateUserPresenter } from '../presenters/AuthenticateUserPresenter'
import JwtService from '../services/JwtService'
import type EmailAuthenticationStrategy from '../strategies/EmailAuthenticationStrategy'
import type EmailRegistrationStrategy from '../strategies/EmailRegistrationStrategy'

export default class AuthenticationController {
  constructor(
    private emailAuthenticationStrategy: EmailAuthenticationStrategy,
    private emailRegistrationStrategy: EmailRegistrationStrategy,
    private jwtService: JwtService,
    private authenticateUserPresenter: AuthenticateUserPresenter
  ) {}

  async login(args: unknown) {
    const result = LoginQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new AuthenticateUser(
      this.emailAuthenticationStrategy,
      this.authenticateUserPresenter,
      this.jwtService
    )
    return await useCase.execute(result.data)
  }

  async register(args: unknown) {
    const result = RegisterQuerySchema.safeParse(args)
    if (!result.success) {
      throw new ValidationError(result.error)
    }
    const useCase = new RegisterUser(
      this.emailRegistrationStrategy,
      this.authenticateUserPresenter,
      this.jwtService
    )
    return await useCase.execute(result.data)
  }
}
