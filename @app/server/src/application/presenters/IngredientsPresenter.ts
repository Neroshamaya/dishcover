import { GetIngredientsResponse } from '@dishcover/shared/types/responses'

import Ingredient from '@/domain/models/Ingredient'
import { Ipresenter } from '@/domain/types/IPresenter'

import { IngredientModelToDto } from './modelAdapters/IngredientModelToDto'

export class IngredientsPresenter implements Ipresenter<Ingredient[], GetIngredientsResponse> {
  present(ingredients: Ingredient[]) {
    return ingredients.map((i) => IngredientModelToDto.adapt(i))
  }
}
