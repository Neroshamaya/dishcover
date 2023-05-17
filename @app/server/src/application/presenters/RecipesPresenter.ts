import { RecipeDtoType } from '@dishcover/shared/types/resources'

import Recipe from '@/domain/models/Recipe'
import { Ipresenter } from '@/domain/types/IPresenter'

import { RecipeModelToDto } from './modelAdapters/RecipeModelToDto'

export class RecipesPresenter implements Ipresenter<Recipe[], RecipeDtoType[]> {
  present(recipes: Recipe[]) {
    return recipes.map((r) => RecipeModelToDto.adapt(r))
  }
}
