import IIngredientRepository from '../../domain/types/IIngredientRepository'
import { PrismaClient, Prisma } from '@prisma/client'
import { IngredientDtoType } from '@dishcover/shared'
import UniqueConstraintError from '../errors/UniqueConstraintError'
import { Ingredient } from '../../domain/models/Ingredient'

export default class IngredientRepository implements IIngredientRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await this.prismaClient.ingredient.findMany({
      select: {
        id: true,
        label: true,
        description: true,
        iconLink: true,
        authorId: true
      }
    })
    return ingredients.map((i) => new Ingredient(i))
  }
  async create(newIngredient: IngredientDtoType): Promise<Ingredient> {
    try {
      const prismaIngredient = await this.prismaClient.ingredient.create({
        select: {
          id: true,
          label: true,
          description: true,
          iconLink: true,
          authorId: true
        },
        data: newIngredient
      })
      return new Ingredient(prismaIngredient)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UniqueConstraintError(error)
        }
      }
      throw error
    }
  }
}
