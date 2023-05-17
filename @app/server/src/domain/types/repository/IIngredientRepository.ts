import {
  CreateIngredientQuery,
  DeleteIngredientQuery,
  UpdateIngredientQuery
} from '@dishcover/shared/types/requests'
import type Ingredient from '../../models/Ingredient'
import User from '@/domain/models/User'

export default interface IIngredientRepository {
  getAll(): Promise<Ingredient[]>
  create(query: CreateIngredientQuery): Promise<Ingredient>
  delete(query: DeleteIngredientQuery): Promise<void>
  update(query: UpdateIngredientQuery): Promise<Ingredient>
}
