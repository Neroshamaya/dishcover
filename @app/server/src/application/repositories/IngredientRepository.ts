import { Prisma, PrismaClient } from '@prisma/client'

import Ingredient from '../../domain/models/Ingredient'
import IIngredientRepository from '../../domain/types/repository/IIngredientRepository'
import UniqueConstraintError from '../errors/UniqueConstraintError'

export default class IngredientRepository implements IIngredientRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await this.prismaClient.ingredient.findMany()
    return ingredients.map((i) => Ingredient.fromPrisma(i))
  }

  async delete(inrgedientId: string): Promise<void> {
    await this.prismaClient.ingredient.delete({
      where: {
        id: inrgedientId
      }
    })
  }

  async create(newIngredient: Ingredient): Promise<Ingredient> {
    try {
      const prismaIngredient = await this.prismaClient.ingredient.create({
        data: newIngredient.toPrismaCreate()
      })
      return Ingredient.fromPrisma(prismaIngredient)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UniqueConstraintError(error)
        }
      }
      throw error
    }
  }

  async update(ingredient: Ingredient): Promise<Ingredient> {
    try {
      const prismaIngredient = await this.prismaClient.ingredient.update({
        where: { id: ingredient.id?.value },
        data: ingredient.toPrismaUpdate()
      })
      return Ingredient.fromPrisma(prismaIngredient)
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
