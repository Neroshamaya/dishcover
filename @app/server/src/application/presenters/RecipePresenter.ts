import { RecipeDtoType } from '@dishcover/shared/types/resources'

import Recipe from '@/domain/models/Recipe'
import { Ipresenter } from '@/domain/types/IPresenter'

import { RecipeModelToDto } from './modelAdapters/RecipeModelToDto'

export class RecipePresenter implements Ipresenter<Recipe, RecipeDtoType> {
  present(recipe: Recipe) {
    return RecipeModelToDto.adapt(recipe)
  }
}
