import IReceipeRepository from '../../domain/types/IReceipeRepository'
import { PrismaClient, Prisma } from '@prisma/client'
import UniqueConstraintError from '../errors/UniqueConstraintError'
import { Recipe } from '../../domain/models/Recipe'

export default class ReceipeRepository implements IReceipeRepository {
  constructor(private prismaClient: PrismaClient) {}

  async retrieveAllFromUser(userId: string): Promise<Recipe[]> {
    const receipes = await this.prismaClient.recipe.findMany({
      where: {
        authorId: userId
      },
      include: {
        ingredients: {
          include: {
            Ingredient: true
          }
        }
      }
    })

    return receipes.map(
      (receipe) =>
        new Recipe({
          ...receipe,
          ingredients: receipe.ingredients || []
        })
    )
  }

  async retrieveAllExceptFromUser(userId: string): Promise<Recipe[]> {
    const receipes = await this.prismaClient.recipe.findMany({
      where: {
        authorId: {
          not: userId
        }
      },
      include: {
        ingredients: {
          include: {
            Ingredient: true
          }
        }
      }
    })
    return receipes.map((receipe) => new Recipe(receipe))
  }

  async createReceipe(receipe: Recipe): Promise<Recipe> {
    try {
      const { label, authorId, description, image, ingredients = [] } = receipe.getDto()

      const prismaReceipe = await this.prismaClient.recipe.create({
        data: {
          label,
          description,
          image,
          ingredients: {
            create: ingredients
          },
          author: {
            connect: {
              id: authorId
            }
          }
        },
        include: {
          ingredients: {
            include: {
              Ingredient: true
            }
          },
          author: true
        }
      })
      return new Recipe(prismaReceipe)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UniqueConstraintError(error)
        }
      }
      throw error
    }
  }
  async deleteReceipe(receipeId: string): Promise<void> {
    await this.prismaClient.recipe.delete({
      where: {
        id: receipeId
      }
    })
  }

  async updateReceipe(recipe: Recipe): Promise<Recipe> {
    try {
      const { label, authorId, description, ingredients, image } = recipe.getDto()

      const keptIngredientIds = ingredients?.map((i) => i.ingredientId)
      const prismaReceipe = await this.prismaClient.recipe.update({
        where: {
          id: recipe.getDto().id
        },
        data: {
          label,
          description,
          image,
          ingredients: {
            deleteMany: {
              recipeId: recipe.getDto().id,
              ingredientId: {
                notIn: keptIngredientIds
              }
            },
            connectOrCreate: ingredients
              ?.filter((i) => i.id)
              .map((i) => {
                delete i.recipeId
                return {
                  where: {
                    id: i.id
                  },
                  create: i
                }
              })
          },
          author: {
            connect: {
              id: authorId
            }
          }
        },
        include: {
          ingredients: {
            include: {
              Ingredient: true
            }
          }
        }
      })
      return new Recipe(prismaReceipe)
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
