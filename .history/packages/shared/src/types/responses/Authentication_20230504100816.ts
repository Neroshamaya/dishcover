import { UserDtoType } from '../../zod/User'

export interface loginResponseBody {
  user: UserDtoType
  token: string
}
