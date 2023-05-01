import type UseCase from '../../domain/types/IUseCase'
import type { IPresenter } from '../../domain/types/IPresenter'
import type { IAuthenticateUserQuery } from './queries/IAuthenticateUserQuery'
import { User } from '../../domain/models/User'
import { IRegistrationStrategy } from '../../domain/types/IRegistrationStrategy'

export class RegisterUser<OutputType = User> implements UseCase<IAuthenticateUserQuery> {
  constructor(
    private registrationStrategy: IRegistrationStrategy,
    private presenter?: IPresenter<boolean | null | User, OutputType>
  ) {}

  async execute(query: { email: string; password: string }): Promise<OutputType | User> {
    const { email, password } = query
    const authenticated = await this.registrationStrategy.register(email, password)
    return this.presenter ? this.presenter.present(authenticated) : authenticated
  }
}
