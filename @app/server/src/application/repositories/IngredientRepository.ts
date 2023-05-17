import { Prisma, PrismaClient } from '@prisma/client'

import Ingredient from '../../domain/models/Ingredient'
import IIngredientRepository from '../../domain/types/repository/IIngredientRepository'
import UniqueConstraintError from '../errors/UniqueConstraintError'
import { IngredientCreateToPrismaAdapter } from './adapters/prisma/query/ingredient/IngredientCreateToPrismaAdapter'
import { IngredientUpdateToPrismaAdapter } from './adapters/prisma/query/ingredient/IngredientUpdateToPrismaAdapter'
import { IngredientDeleteToPrismaAdapter } from './adapters/prisma/query/ingredient/IngredientDeleteToPrismaAdapter'

import {
  CreateIngredientQuery,
  UpdateIngredientQuery,
  DeleteIngredientQuery
} from '@dishcover/shared/types/requests'
import { PrismaIngredientToModel } from './adapters/prisma/entities/PrismaIngredientToModel'

export default class IngredientRepository implements IIngredientRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await this.prismaClient.ingredient.findMany()
    return ingredients.map((i) => PrismaIngredientToModel.adapt(i))
  }

  async delete(query: DeleteIngredientQuery): Promise<void> {
    await this.prismaClient.ingredient.delete(IngredientDeleteToPrismaAdapter.adapt(query))
  }

  async create(query: CreateIngredientQuery): Promise<Ingredient> {
    try {
      const prismaIngredient = await this.prismaClient.ingredient.create(
        IngredientCreateToPrismaAdapter.adapt(query)
      )
      return PrismaIngredientToModel.adapt(prismaIngredient)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UniqueConstraintError(error)
        }
      }
      throw error
    }
  }

  async update(query: UpdateIngredientQuery): Promise<Ingredient> {
    try {
      const prismaIngredient = await this.prismaClient.ingredient.update(
        IngredientUpdateToPrismaAdapter.adapt(query)
      )
      return PrismaIngredientToModel.adapt(prismaIngredient)
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
