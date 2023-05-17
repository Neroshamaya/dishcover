import type User from '../../models/User'
import { LoginQuery } from '@dishcover/shared/types/requests/Authentication'

export interface IUserRepository {
  getUserByEmail(query: LoginQuery): Promise<User | null>
}
