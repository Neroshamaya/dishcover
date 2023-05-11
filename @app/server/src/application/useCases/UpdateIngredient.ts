import { CreateIngredientResponseBody } from '@dishcover/shared/types/responses'
import Ingredient from '../../domain/models/Ingredient'
import type UseCase from '../../domain/types/IUseCase'
import IngredientRepository from '../repositories/IngredientRepository'
import { IngredientDtoType } from '@dishcover/shared/types/resources'

export class UpdateIngredient<OutputType> implements UseCase<Ingredient> {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(newIngredient: Ingredient): Promise<OutputType | IngredientDtoType> {
    const ingredient = await this.ingredientRepository.update(newIngredient)
    return ingredient.toResponse()
  }
}
