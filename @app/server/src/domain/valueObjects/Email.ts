import { z } from 'zod'

export default class Email {
  private schema = z.string().email()

  constructor(readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email')
    }
  }

  private isValid(value: string): boolean {
    const result = this.schema.safeParse(value)
    return result.success
  }
}
