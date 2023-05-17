import { LoginQuery } from '@dishcover/shared/types/requests'

export class UserFindOneToPrismaAdapter {
  static adapt({ email }: LoginQuery) {
    return {
      where: {
        email
      }
    }
  }
}
