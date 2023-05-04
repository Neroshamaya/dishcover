import * as apiClient from '../api/apiClient'
import { LoginQuerySchema } from '@dishcover/shared'

export const login = (args: unknown) => {
  const loginQuery = LoginQuerySchema.parse(args)
  return apiClient.login(loginQuery)
}
