import { Ipresenter } from '@/domain/types/IPresenter'
import { UserDtoType } from '@dishcover/shared/types/resources'
import { LoginResponse } from '@dishcover/shared/types/responses/Authentication'
import { CreateIngredientResponse } from '@dishcover/shared/types/responses'
import { UserModelToDto } from './modelAdapters/UserModelToDto'
import { IngredientModelToDto } from './modelAdapters/IngredientModelToDto'
import Ingredient from '@/domain/models/Ingredient'

export class IngredientPresenter implements Ipresenter<Ingredient, CreateIngredientResponse> {
  present(ingredient: Ingredient): CreateIngredientResponse {
    return IngredientModelToDto.adapt(ingredient)
  }
}
