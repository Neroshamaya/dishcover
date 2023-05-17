import { Ipresenter } from '@/domain/types/IPresenter'
import { RecipeDtoType, UserDtoType } from '@dishcover/shared/types/resources'
import { LoginResponse } from '@dishcover/shared/types/responses/Authentication'
import { CreateIngredientResponse } from '@dishcover/shared/types/responses'
import { RecipeModelToDto } from './modelAdapters/RecipeModelToDto'
import { IngredientModelToDto } from './modelAdapters/IngredientModelToDto'
import Recipe from '@/domain/models/Recipe'

export class RecipePresenter implements Ipresenter<Recipe, RecipeDtoType> {
  present(recipe: Recipe) {
    return RecipeModelToDto.adapt(recipe)
  }
}
