import { AuthenticateUser } from '../useCases/AuthenticateUser'
import { RegisterUser } from '../useCases/RegisterUser'
import type EmailAuthenticationStrategy from '../strategies/EmailAuthenticationStrategy'
import type EmailRegistrationStrategy from '../strategies/EmailRegistrationStrategy'
import { authenticateUserQuerySchema } from '../useCases/queries/IAuthenticateUserQuery'
import ValidationError from '../errors/ValidationError'
import JwtService from '../services/JwtService'

export default class AuthenticationController {
  constructor(
    private emailAuthenticationStrategy: EmailAuthenticationStrategy,
    private emailRegistrationStrategy: EmailRegistrationStrategy,
    private jwtService: JwtService
  ) {}

  async login(args: unknown) {
    const result = authenticateUserQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new AuthenticateUser(this.emailAuthenticationStrategy)
    const response = await useCase.execute(result.data)
    const token = this.jwtService.generateToken({
      email: result.data.email,
      id: response.getDto().id
    })
    return { user: response, token }
  }

  async register(args: unknown) {
    const result = authenticateUserQuerySchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new RegisterUser(this.emailRegistrationStrategy)
    const response = await useCase.execute(result.data)

    const token = this.jwtService.generateToken({
      email: result.data.email,
      id: response.getDto().id
    })
    return { user: response, token }
  }
}
