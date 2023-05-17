import User from '@/domain/models/User'
import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { UserDtoType } from '@dishcover/shared/types/resources'
import { Prisma, Ingredient as PrismaIngredient } from '@prisma/client'
import Ingredient from '@/domain/models/Ingredient'
import { IngredientDtoType } from '@dishcover/shared/types/resources'
import { UserModelToDto } from './UserModelToDto'

export class IngredientModelToDto {
  static adapt({
    authorId,
    label,
    author,
    description,
    iconLink,
    id
  }: Ingredient): IngredientDtoType {
    {
      return {
        authorId: authorId.value,
        label,
        author: UserModelToDto.adapt(author),
        description,
        iconLink: iconLink?.value,
        id: id.value
      }
    }
  }
}
