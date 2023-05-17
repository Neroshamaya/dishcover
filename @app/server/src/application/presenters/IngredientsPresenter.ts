import { Ipresenter } from '@/domain/types/IPresenter'
import { UserDtoType } from '@dishcover/shared/types/resources'
import { LoginResponse } from '@dishcover/shared/types/responses/Authentication'
import { CreateIngredientResponse, GetIngredientsResponse } from '@dishcover/shared/types/responses'
import { UserModelToDto } from './modelAdapters/UserModelToDto'
import { IngredientModelToDto } from './modelAdapters/IngredientModelToDto'
import Ingredient from '@/domain/models/Ingredient'
import { GetIngredients } from '../../domain/useCases/GetIngredients'

export class IngredientsPresenter implements Ipresenter<Ingredient[], GetIngredientsResponse> {
  present(ingredients: Ingredient[]) {
    return ingredients.map((i) => IngredientModelToDto.adapt(i))
  }
}
