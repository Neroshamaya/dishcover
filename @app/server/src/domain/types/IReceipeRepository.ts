import type { Receipe } from '../models/Recipe'

export default interface IReceipeRepository {
  retrieveAllFromUser(userId: string): Promise<Receipe[]>
  retrieveAllExceptFromUser(userId: string): Promise<Receipe[]>
}
