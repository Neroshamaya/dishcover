import { GetIngredients } from '../useCases/GetIngredients'
import type JSONPresenter from '../presenters/JSONPresenter'
import IngredientRepository from '../repositories/IngredientRepository'
import { IngredientSchema } from '@dishcover/shared'
import ValidationError from '../errors/ValidationError'
import { CreateIngredient } from '../useCases/CreateIngredient'

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

  async createIngredient(args: unknown) {
    const result = IngredientSchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new CreateIngredient(this.ingredientRepository, this.jsonPresenter)
    const response = await useCase.execute(result.data)
    return response
  }
}
