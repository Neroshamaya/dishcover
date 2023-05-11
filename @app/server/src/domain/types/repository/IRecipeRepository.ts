import type Recipe from '../../models/Recipe'

export default interface IRecipeRepository {
  retrieveAllFromUser(userId: string): Promise<Recipe[]>
  retrieveAll(): Promise<Recipe[]>
}
