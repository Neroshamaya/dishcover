import { IDomainModel } from '../types/IDomainModel'

import { IngredientDtoType, IngredientSchema } from '@dishcover/shared'

export class Ingredient implements IDomainModel<IngredientDtoType> {
  constructor(private readonly ingredientInfos: IngredientDtoType) {
    this.validate()
  }

  getDto(): IngredientDtoType {
    return {
      id: this.ingredientInfos.id,
      label: this.ingredientInfos.label,
      description: this.ingredientInfos.description,
      iconLink: this.ingredientInfos.iconLink
    }
  }
  validate() {
    IngredientSchema.parse(this.ingredientInfos)
  }
}
