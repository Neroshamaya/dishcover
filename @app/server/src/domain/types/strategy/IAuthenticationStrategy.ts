import type { Query } from '@dishcover/shared/types/requests'

import type User from '../../models/User'

export interface IAuthenticationStrategy {
  authenticate(query: Query): Promise<never | User>
}
