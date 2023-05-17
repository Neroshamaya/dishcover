import z from 'zod'
import { IngredientSchema } from '../../schemas/resources/Ingredient'
import { Overwrite } from 'utility-types'
import { UserDtoType } from './User'

export type IngredientDtoType = Overwrite<
  z.infer<typeof IngredientSchema>,
  {
    author: UserDtoType
  }
>
