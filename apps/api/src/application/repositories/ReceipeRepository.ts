import IReceipeRepository from '../../domain/types/IReceipeRepository'
import { PrismaClient, Prisma } from '@prisma/client'
import UniqueConstraintError from '../errors/UniqueConstraintError'
import { Receipe } from '../../domain/models/Receipe'

export default class ReceipeRepository implements IReceipeRepository {
  constructor(private prismaClient: PrismaClient) {}

  async retrieveAllFromUser(userId: string): Promise<Receipe[]> {
    const receipes = await this.prismaClient.receipe.findMany({
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
        new Receipe({
          ...receipe,
          ingredients: receipe.ingredients || []
        })
    )
  }

  async retrieveAllExceptFromUser(userId: string): Promise<Receipe[]> {
    const receipes = await this.prismaClient.receipe.findMany({
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
    return receipes.map((receipe) => new Receipe(receipe))
  }

  async createReceipe(receipe: Receipe): Promise<Receipe> {
    try {
      const { label, authorId, description, image, ingredients = [] } = receipe.getDto()

      const prismaReceipe = await this.prismaClient.receipe.create({
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
      return new Receipe(prismaReceipe)
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
    await this.prismaClient.receipe.delete({
      where: {
        id: receipeId
      }
    })
  }

  async updateReceipe(receipe: Receipe): Promise<Receipe> {
    try {
      const { label, authorId, description, ingredients, image } = receipe.getDto()

      const newIngredients = ingredients
        .filter((i) => !i.id)
        .map((i) => {
          delete i.receipeId
          return i
        })
      const createMany =
        newIngredients.length > 0
          ? {
              data: newIngredients
            }
          : undefined

      const keptIngredientIds = newIngredients.map((i) => i.ingredientId)
      const prismaReceipe = await this.prismaClient.receipe.update({
        where: {
          id: receipe.getDto().id
        },
        data: {
          label,
          description,
          image,
          ingredients: {
            createMany,
            deleteMany: {
              receipeId: receipe.getDto().id,
              ingredientId: {
                notIn: keptIngredientIds
              }
            },
            connectOrCreate: ingredients
              .filter((i) => i.id)
              .map((i) => {
                delete i.receipeId
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
      return new Receipe(prismaReceipe)
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
