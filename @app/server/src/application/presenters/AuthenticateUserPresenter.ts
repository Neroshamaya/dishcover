import { Ipresenter } from '@/domain/types/IPresenter'
import { UserDtoType } from '@dishcover/shared/types/resources'
import { LoginResponse } from '@dishcover/shared/types/responses/Authentication'
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
