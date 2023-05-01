import IIngredientRepository from '../../domain/types/IIngredientRepository'
import { User } from '../../domain/models/User'
import { Prisma, PrismaClient } from '@prisma/client'
import UniqueConstraintError from '../errors/UniqueConstraintError'
import { Ingredient } from '../../domain/models/Ingredient'

export default class IngredientRepository implements IIngredientRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await this.prismaClient.ingredient.findMany()
    return ingredients.map((i) => new Ingredient(i))
  }
}
