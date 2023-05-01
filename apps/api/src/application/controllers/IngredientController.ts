import { GetIngredients } from '../useCases/GetIngredients'
import type JSONPresenter from '../presenters/JSONPresenter'
import IngredientRepository from '../repositories/IngredientRepository'

export default class IngredientController {
  constructor(
    private ingredientRepository: IngredientRepository,
    private jsonPresenter: JSONPresenter
  ) {}

  async retrieveAll() {
    const useCase = new GetIngredients(this.ingredientRepository, this.jsonPresenter)
    const response = await useCase.execute()
    return response
  }
}
