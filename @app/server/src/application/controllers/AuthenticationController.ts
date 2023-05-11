import {
  LoginQuerySchema,
  RegisterQuerySchema
} from '@dishcover/shared/schemas/requests/Authentication'

import ValidationError from '../errors/ValidationError'
import JwtService from '../services/JwtService'
import type EmailAuthenticationStrategy from '../strategies/EmailAuthenticationStrategy'
import type EmailRegistrationStrategy from '../strategies/EmailRegistrationStrategy'
import { AuthenticateUser } from '../useCases/AuthenticateUser'
import { RegisterUser } from '../useCases/RegisterUser'

export default class AuthenticationController {
  constructor(
    private emailAuthenticationStrategy: EmailAuthenticationStrategy,
    private emailRegistrationStrategy: EmailRegistrationStrategy,
    private jwtService: JwtService
  ) {}

  async login(args: unknown) {
    const result = LoginQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new AuthenticateUser(this.emailAuthenticationStrategy)
    const response = await useCase.execute(result.data)
    const token = this.jwtService.generateToken({
      email: result.data.email,
      id: response.id?.value
    })
    return { user: response.toResponse(), token }
  }

  async register(args: unknown) {
    const result = RegisterQuerySchema.safeParse(args)
    if (!result.success) {
      throw new ValidationError(result.error)
    }
    const useCase = new RegisterUser(this.emailRegistrationStrategy)
    const user = await useCase.execute(result.data)

    const token = this.jwtService.generateToken({
      email: result.data.email,
      id: user.id?.value
    })
    return { user: user.toResponse(), token }
  }
}
