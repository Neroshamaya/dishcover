import type { DeleteIngredientQuery } from '@dishcover/shared/types/requests/Ingredient'

import type UseCase from '../../domain/types/IUseCase'
import IngredientRepository from '../repositories/IngredientRepository'

export class DeleteIngredient<OutputType> implements UseCase<DeleteIngredientQuery> {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(query: DeleteIngredientQuery): Promise<OutputType | void> {
    await this.ingredientRepository.delete(query.id)
  }
}
