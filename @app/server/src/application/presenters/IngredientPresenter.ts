import { CreateIngredientResponse } from '@dishcover/shared/types/responses'

import Ingredient from '@/domain/models/Ingredient'
import { Ipresenter } from '@/domain/types/IPresenter'

import { IngredientModelToDto } from './modelAdapters/IngredientModelToDto'

export class IngredientPresenter implements Ipresenter<Ingredient, CreateIngredientResponse> {
  present(ingredient: Ingredient): CreateIngredientResponse {
    return IngredientModelToDto.adapt(ingredient)
  }
}
