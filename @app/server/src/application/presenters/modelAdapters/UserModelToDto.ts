import { UserDtoType } from '@dishcover/shared/types/resources'

import User from '@/domain/models/User'
export class UserModelToDto {
  static adapt(user: User): UserDtoType {
    {
      return {
        email: user.email.value,
        id: user.id.value
      }
    }
  }
}
