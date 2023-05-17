import { LoginQuery } from '@dishcover/shared/types/requests/Authentication'

import type User from '../../models/User'

export interface IUserRepository {
  getUserByEmail(query: LoginQuery): Promise<User | null>
}
