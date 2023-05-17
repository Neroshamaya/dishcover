import { LoginResponse } from '@dishcover/shared/types/responses/Authentication'

import { Ipresenter } from '@/domain/types/IPresenter'

import { AuthenticateUserExecResponse } from '../../domain/useCases/AuthenticateUser'
import { UserModelToDto } from './modelAdapters/UserModelToDto'

export class AuthenticateUserPresenter
  implements Ipresenter<AuthenticateUserExecResponse, LoginResponse>
{
  present({ user, token }: AuthenticateUserExecResponse) {
    return {
      user: UserModelToDto.adapt(user),
      token
    }
  }
}
