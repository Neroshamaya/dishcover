import { Prisma, PrismaClient } from '@prisma/client'

import Recipe from '../../domain/models/Recipe'
import IRecipeRepository from '../../domain/types/repository/IRecipeRepository'
import UniqueConstraintError from '../errors/UniqueConstraintError'

export default class RecipeRepository implements IRecipeRepository {
  constructor(private prismaClient: PrismaClient) {}
  async retrieveAll() {
    const recipes = await this.prismaClient.recipe.findMany({
      include: {
        ingredients: {
          include: {
            details: true
          }
        },
        author: true
      }
    })

    return recipes.map((recipe) => Recipe.fromPrisma(recipe))
  }

  async retrieveAllFromUser(userId: string) {
    const recipes = await this.prismaClient.recipe.findMany({
      where: {
        authorId: userId
      },
      include: {
        ingredients: {
          include: {
            details: true
          }
        },
        author: true
      }
    })
    return recipes.map((recipe) => Recipe.fromPrisma(recipe))
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    try {
      const prismaRecipe = await this.prismaClient.recipe.create({
        data: recipe.toPrismaCreate(),
        include: {
          ingredients: {
            include: {
              details: true
            }
          },
          author: true
        }
      })
      return Recipe.fromPrisma(prismaRecipe)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UniqueConstraintError(error)
        }
      }
      throw error
    }
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    await this.prismaClient.recipe.delete({
      where: {
        id: recipeId
      }
    })
  }

  async updateRecipe(recipe: Recipe): Promise<Recipe> {
    try {
      const prismaRecipe = await this.prismaClient.recipe.update({
        where: {
          id: recipe.id?.value
        },
        include: {
          ingredients: {
            include: {
              details: true
            }
          },
          author: true
        },
        data: recipe.toPrismaUpdate()
      })
      return Recipe.fromPrisma(prismaRecipe)
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
