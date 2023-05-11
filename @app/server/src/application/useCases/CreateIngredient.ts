import { CreateIngredientResponseBody } from '@dishcover/shared/types/responses'
import Ingredient from '../../domain/models/Ingredient'
import type UseCase from '../../domain/types/IUseCase'
import IngredientRepository from '../repositories/IngredientRepository'
import { IngredientDtoType } from '@dishcover/shared/types/resources'

export class CreateIngredient<OutputType> implements UseCase<Ingredient> {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(newIngredient: Ingredient): Promise<OutputType | CreateIngredientResponseBody> {
    const ingredient = await this.ingredientRepository.create(newIngredient)
    return ingredient.toResponse()
  }
}
