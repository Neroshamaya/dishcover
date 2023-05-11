import type Ingredient from '../../models/Ingredient'

export default interface IIngredientRepository {
  getAll(): Promise<Ingredient[]>
}
