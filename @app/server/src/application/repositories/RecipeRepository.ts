import {
  CreateRecipeQuery,
  DeleteRecipeQuery,
  GetAllRecipesQuery,
  GetUserRecipesQuery,
  UpdateRecipeQuery
} from '@dishcover/shared/types/requests'
import { Prisma, PrismaClient } from '@prisma/client'

import Recipe from '../../domain/models/Recipe'
import IRecipeRepository from '../../domain/types/repository/IRecipeRepository'
import UniqueConstraintError from '../errors/UniqueConstraintError'
import { PrismaRecipeToModel } from './adapters/prisma/entities/PrismaRecipeToModel'
import { RecipeCreateToPrismaAdapter } from './adapters/prisma/query/recipe/RecipeCreateToPrismaAdapter'
import { RecipeDeleteToPrismaAdapter } from './adapters/prisma/query/recipe/RecipeDeleteToPrismaAdapter'
import { RecipeFindManyToPrismaAdapter } from './adapters/prisma/query/recipe/RecipeFindManyToPrismaAdapter'
import { RecipeUpdateToPrismaAdapter } from './adapters/prisma/query/recipe/RecipeUpdateToPrismaAdapter'

export default class RecipeRepository implements IRecipeRepository {
  constructor(private prismaClient: PrismaClient) {}

  async retrieveAll(query: GetAllRecipesQuery | GetUserRecipesQuery) {
    const recipes = await this.prismaClient.recipe.findMany(
      RecipeFindManyToPrismaAdapter.adapt(query)
    )
    return recipes.map((recipe) => PrismaRecipeToModel.adapt(recipe))
  }

  async createRecipe(query: CreateRecipeQuery): Promise<Recipe> {
    try {
      const prismaRecipe = await this.prismaClient.recipe.create(
        RecipeCreateToPrismaAdapter.adapt(query)
      )
      return PrismaRecipeToModel.adapt(prismaRecipe)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UniqueConstraintError(error)
        }
      }
      throw error
    }
  }

  async deleteRecipe(query: DeleteRecipeQuery): Promise<void> {
    await this.prismaClient.recipe.delete(RecipeDeleteToPrismaAdapter.adapt(query))
  }

  async updateRecipe(query: UpdateRecipeQuery): Promise<Recipe> {
    try {
      const prismaRecipe = await this.prismaClient.recipe.update(
        RecipeUpdateToPrismaAdapter.adapt(query)
      )
      return PrismaRecipeToModel.adapt(prismaRecipe)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UniqueConstraintError(error)
        }
      }
      throw error
    }
  }
}
