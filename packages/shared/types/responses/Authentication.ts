import { UserDtoType } from '../../types/resources/User'

export interface LoginResponse {
  user: UserDtoType
  token: string
}

export type RegisterResponse = LoginResponse
