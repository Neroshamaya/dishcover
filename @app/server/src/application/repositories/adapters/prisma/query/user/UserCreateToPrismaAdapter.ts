export class UserCreateToPrismaAdapter {
  static adapt({ email, salt, password }: { email: string; password: string; salt: string }) {
    return {
      data: {
        email,
        salt,
        password
      }
    }
  }
}
