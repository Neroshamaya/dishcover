import { Query } from '@dishcover/shared/types/requests'

import type User from '../../models/User'

export interface IRegistrationStrategy {
  register(query: Query): Promise<User | never>
}
