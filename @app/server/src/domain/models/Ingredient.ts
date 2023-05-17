import Id from '../valueObjects/Id'
import Uri from '../valueObjects/Uri'
import User from './User'

interface IngredientParams {
  readonly id: Id
  readonly label: string
  readonly description?: string | null
  readonly iconLink?: Uri
  readonly authorId: Id
  readonly author: User
}

export default class Ingredient {
  readonly id
  readonly label
  readonly description?
  readonly iconLink?
  readonly authorId: Id
  readonly author: User

  constructor({ id, label, description, iconLink, authorId, author }: IngredientParams) {
    this.id = id
    this.label = label
    this.description = description
    this.iconLink = iconLink
    this.authorId = authorId
    this.author = author
  }
}
