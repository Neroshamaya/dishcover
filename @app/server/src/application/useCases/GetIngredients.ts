import { IngredientDtoType } from '@dishcover/shared/types/resources'
import type UseCase from '../../domain/types/IUseCase'
import IngredientRepository from '../repositories/IngredientRepository'

export class GetIngredients<OutputType> implements UseCase<void> {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(): Promise<OutputType | IngredientDtoType[]> {
    const ingredients = await this.ingredientRepository.getAll()
    return ingredients.map((ingredient) => ingredient.toResponse())
  }
}
