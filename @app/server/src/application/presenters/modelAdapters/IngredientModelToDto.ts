import { IngredientDtoType } from '@dishcover/shared/types/resources'

import Ingredient from '@/domain/models/Ingredient'

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
