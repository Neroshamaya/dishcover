import { ObjectId } from 'bson'
import { z } from 'zod'

export default class Id {
  readonly value: string
  private schema = z.string().refine((id) => ObjectId.isValid(id))
  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid id')
    }
    this.value = value
  }

  private isValid(value: string): boolean {
    const result = this.schema.safeParse(value)
    return result.success
  }

  static from(value: string | null | undefined): Id | undefined {
    return typeof value == 'string' ? new Id(value) : undefined
  }
}
