import type { DeleteIngredientQuery } from '@dishcover/shared/types/requests/Ingredient'

import type UseCase from '../types/IUseCase'
import IIngredientRepository from '@/domain/types/repository/IIngredientRepository'

export class DeleteIngredient implements UseCase<DeleteIngredientQuery> {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(query: DeleteIngredientQuery) {
    await this.ingredientRepository.delete(query)
  }
}
