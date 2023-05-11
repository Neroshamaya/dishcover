import { UserDtoType } from '../../types/resources/User'

export interface LoginResponseBody {
  user: UserDtoType
  token: string
}
