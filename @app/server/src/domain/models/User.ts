import { IDomainModel } from '../types/IDomainModel'
import { UserDtoType, UserSchema } from '@dishcover/shared'

export class User implements IDomainModel<UserDtoType> {
  constructor(private readonly userInfos: UserDtoType) {
    this.validate()
  }

  getDto(): UserDtoType {
    return {
      id: this.userInfos.id,
      email: this.userInfos.email,
      salt: this.userInfos.salt,
      password: this.userInfos.password,
      created: this.userInfos.created,
      updated: this.userInfos.updated
    }
  }
  validate() {
    UserSchema.parse(this.userInfos)
  }
}
