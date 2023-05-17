import {
  CreateIngredientSchema,
  DeleteIngredientSchema,
  UpdateIngredientSchema
} from '@dishcover/shared/schemas/requests/Ingredient'

import { CreateIngredient } from '../../domain/useCases/CreateIngredient'
import { DeleteIngredient } from '../../domain/useCases/DeleteIngredient'
import { GetIngredients } from '../../domain/useCases/GetIngredients'
import { UpdateIngredient } from '../../domain/useCases/UpdateIngredient'
import ValidationError from '../errors/ValidationError'
import { IngredientPresenter } from '../presenters/IngredientPresenter'
import { IngredientsPresenter } from '../presenters/IngredientsPresenter'
import IngredientRepository from '../repositories/IngredientRepository'

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
