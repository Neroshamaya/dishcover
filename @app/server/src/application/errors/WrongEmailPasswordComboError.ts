import { IWrongEmailPasswordComboError } from '@dishcover/shared/types/Errors'
import { LoginQuery } from '@dishcover/shared/types/requests/Authentication'

export default class WrongEmailPasswordComboError
  extends Error
  implements IWrongEmailPasswordComboError
{
  details
  status = 401
  code
  constructor(error: Error) {
    super(error.message)
    this.details = [
      {
        fields: ['email', 'password'] as (keyof LoginQuery)[],
        message: 'wrong email or password'
      }
    ]
    this.code = 'WrongEmailPasswordComboError' as const
  }
}
