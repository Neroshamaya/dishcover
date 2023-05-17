import {
  CreateIngredientSchema,
  UpdateIngredientSchema,
  DeleteIngredientSchema
} from '@dishcover/shared/schemas/requests/Ingredient'

import Ingredient from '../../domain/models/Ingredient'
import ValidationError from '../errors/ValidationError'
import IngredientRepository from '../repositories/IngredientRepository'
import { CreateIngredient } from '../../domain/useCases/CreateIngredient'
import { UpdateIngredient } from '../../domain/useCases/UpdateIngredient'
import { GetIngredients } from '../../domain/useCases/GetIngredients'
import { DeleteIngredient } from '../../domain/useCases/DeleteIngredient'
import { IngredientsPresenter } from '../presenters/IngredientsPresenter'
import { IngredientPresenter } from '../presenters/IngredientPresenter'

export default class IngredientController {
  constructor(
    private ingredientRepository: IngredientRepository,
    private ingredientsPresenter: IngredientsPresenter,
    private ingredientPresenter: IngredientPresenter
  ) {}

  async retrieveAll() {
    const useCase = new GetIngredients(this.ingredientRepository, this.ingredientsPresenter)
    const response = await useCase.execute()
    return response
  }

  async createIngredient(args: unknown) {
    const result = CreateIngredientSchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new CreateIngredient(this.ingredientRepository, this.ingredientPresenter)
    const response = await useCase.execute(result.data)
    return response
  }

  async updateIngredient(args: unknown) {
    const result = UpdateIngredientSchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new UpdateIngredient(this.ingredientRepository, this.ingredientPresenter)
    const response = await useCase.execute(result.data)
    return response
  }

  async deleteIngredient(args: unknown) {
    const result = DeleteIngredientSchema.safeParse(args)
    if (!result.success) throw new ValidationError(result.error)
    const useCase = new DeleteIngredient(this.ingredientRepository)
    const response = await useCase.execute(result.data)
    return response
  }
}
