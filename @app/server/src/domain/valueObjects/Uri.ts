import { z } from 'zod'

export default class Uri {
  readonly value: string
  private schema = z.string().url()
  constructor(value = '') {
    if (!this.isValid(value)) {
      throw new Error('Invalid url')
    }
    this.value = value
  }

  private isValid(value: string): boolean {
    const result = this.schema.safeParse(value)
    return result.success
  }

  static from(value: string | null | undefined): Uri | undefined {
    return typeof value == 'string' && value.length > 0 ? new Uri(value) : undefined
  }
}
