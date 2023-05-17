import type { DeleteIngredientQuery } from '@dishcover/shared/types/requests/Ingredient'

import IIngredientRepository from '@/domain/types/repository/IIngredientRepository'

import type UseCase from '../types/IUseCase'

export class DeleteIngredient implements UseCase<DeleteIngredientQuery> {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(query: DeleteIngredientQuery) {
    await this.ingredientRepository.delete(query)
  }
}
