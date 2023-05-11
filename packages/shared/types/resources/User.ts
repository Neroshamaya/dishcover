import { z } from 'zod'
import { ObjectId } from 'bson'
import { UserSchema } from '../../schemas/resources/User'
import { Overwrite } from 'utility-types'

export type UserDtoType = Overwrite<
  Pick<z.infer<typeof UserSchema>, 'id' | 'email'>,
  { id: string }
>
