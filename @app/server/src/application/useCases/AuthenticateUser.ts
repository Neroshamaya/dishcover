import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import { IAuthenticationStrategy } from '../../domain/types/IAuthenticationStrategy'
import type { IAuthenticateUserQuery } from './queries/IAuthenticateUserQuery'
import { User } from '../../domain/models/User'

export class AuthenticateUser<OutputType = User> implements UseCase<IAuthenticateUserQuery> {
  constructor(
    private authenticationStrategy: IAuthenticationStrategy,
    private presenter?: IPresenter<boolean | null | User, OutputType>
  ) {}

  async execute(query: { email: string; password: string }): Promise<OutputType | User> {
    const { email, password } = query
    const authenticated = await this.authenticationStrategy.authenticate(email, password)

    return this.presenter ? this.presenter.present(authenticated) : authenticated
  }
}
