import type User from '../../models/User'

export interface IAuthenticationStrategy {
  authenticate(username: string, password: string): Promise<never | User>
}
