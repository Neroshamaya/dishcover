import { IDomainModel } from '../types/IDomainModel'
import { RecipeDtoType, RecipeSchema } from '@dishcover/shared'

export class Recipe implements IDomainModel<RecipeDtoType> {
  constructor(private readonly receipeInfos: RecipeDtoType) {
    this.validate()
  }

  getDto(): RecipeDtoType {
    return {
      id: this.receipeInfos.id,
      label: this.receipeInfos.label,
      ingredients: this.receipeInfos.ingredients || [],
      description: this.receipeInfos.description,
      author: this.receipeInfos.author,
      authorId: this.receipeInfos.authorId,
      created: this.receipeInfos.created,
      updated: this.receipeInfos.updated,
      image: this.receipeInfos.image
    }
  }
  validate() {
    RecipeSchema.parse(this.receipeInfos)
  }
}
