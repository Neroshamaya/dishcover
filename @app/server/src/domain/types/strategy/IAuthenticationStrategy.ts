import type User from '../../models/User'
import type { Query } from '@dishcover/shared/types/requests'

export interface IAuthenticationStrategy {
  authenticate(query: Query): Promise<never | User>
}
