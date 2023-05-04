import { UserDtoType } from '../../zod/User'

export interface LoginResponseBody {
  user: UserDtoType
  token: string
}
