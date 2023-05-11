import { CreateRecipeQuery, UpdateRecipeQuery } from '@dishcover/shared/types/requests'
import Prisma, { Prisma as PrismaClass } from '@prisma/client'

import RecipeIngredient from '../models/RecipeIngredient'
import User from '../models/User'
import Email from '../valueObjects/Email'
import Id from '../valueObjects/Id'
import Uri from '../valueObjects/Uri'
import { RecipeDtoType, UserDtoType } from '@dishcover/shared/types/resources'
import Ingredient from './Ingredient'

interface RecipeParams {
  id?: Id
  label: string
  recipeIngredientIds: Id[]
  description: string
  authorId: Id
  created?: Date | null
  updated?: Date | null
  image?: Uri | null
  recipeIngredients: RecipeIngredient[]
  author?: User | null
}

export default class Recipe {
  readonly id?: Id
  readonly label: string
  readonly recipeIngredientIds: Id[]
  readonly description: string
  readonly authorId: Id
  readonly created?: Date | null
  readonly updated?: Date | null
  readonly image?: Uri | null
  readonly recipeIngredients: RecipeIngredient[]
  readonly author?: User | null
  constructor({
    id,
    label,
    recipeIngredientIds,
    description,
    authorId,
    created,
    updated,
    image,
    recipeIngredients,
    author
  }: RecipeParams) {
    this.id = id
    this.label = label
    this.recipeIngredientIds = recipeIngredientIds
    this.description = description
    this.authorId = authorId
    this.created = created
    this.updated = updated
    this.image = image
    this.recipeIngredients = recipeIngredients
    this.author = author
  }

  static fromPrisma(
    prismaRecipe: Prisma.Recipe & {
      author: Prisma.User
      ingredients: (Prisma.RecipeIngredient & {
        details?: Prisma.Ingredient
      })[]
    }
  ): Recipe {
    return new Recipe({
      author: User.fromPrisma(prismaRecipe.author),
      authorId: new Id(prismaRecipe.authorId),
      created: prismaRecipe.created as Date,
      updated: prismaRecipe.updated as Date,
      description: prismaRecipe.description as string,
      id: new Id(prismaRecipe.id),
      image: Uri.from(prismaRecipe.image),
      recipeIngredients: prismaRecipe.ingredients.map((i) => RecipeIngredient.fromPrisma(i)),
      label: prismaRecipe.label as string,
      recipeIngredientIds: prismaRecipe.recipeIngredientIds.map((prismaId) => new Id(prismaId))
    })
  }

  static fromRecipeQuery(query: CreateRecipeQuery | UpdateRecipeQuery): Recipe {
    return new Recipe({
      id: Id.from(query.id),
      label: query.label,
      created: query.created,
      updated: query.updated,
      recipeIngredientIds: query.recipeIngredients
        .filter((i) => !!i.id)
        .map((i) => new Id(i.id as string)),
      description: query.description as string,
      authorId: new Id(query.authorId),
      image: Uri.from(query.image),
      recipeIngredients: query.recipeIngredients.map(
        (i) =>
          new RecipeIngredient({
            ...i,
            id: Id.from(i.id),
            ingredientId: Id.from(i.ingredientId) as Id,
            recipeId: Id.from(i.recipeId) as Id
          })
      )
    })
  }

  toResponse(): RecipeDtoType {
    return {
      author: this.author?.toResponse() as UserDtoType,
      authorId: this.authorId.value,
      created: this.created as Date,
      updated: this.updated as Date,
      description: this.description,
      id: this.id?.value,
      image: this.image?.value,
      recipeIngredients: this.recipeIngredients.map((i) => i.toResponse()),
      label: this.label,
      recipeIngredientIds: this.recipeIngredientIds.map((i) => i.value)
    }
  }

  toPrismaCreate(): PrismaClass.RecipeCreateInput {
    return {
      label: this.label,
      description: this.description,
      author: {
        connect: {
          id: this.authorId.value
        }
      },
      ingredients: {
        create: this.recipeIngredients.map((i) => i.toPrismaCreate())
      },
      image: this.image?.value
    }
  }

  toPrismaUpdate(): PrismaClass.RecipeUpdateInput {
    const recipeIngredientsToKeep = this.recipeIngredientIds
    const recipeIngredientsWithoutIds = this.recipeIngredients?.filter((i) => !i.id)
    return {
      label: this.label,
      author: {
        connect: {
          id: this.authorId.value
        }
      },
      description: this.description,
      ingredients: {
        deleteMany: {
          recipeId: this.id?.value,
          ingredientId: {
            notIn: recipeIngredientsToKeep.map((i) => i.value)
          }
        },
        connectOrCreate: this.recipeIngredients.map((ri) => {
          return {
            where: {
              ingredientId_recipeId: {
                recipeId: this.id?.value,
                ingredientId: ri.ingredientId.value
              }
            },
            create: ri.toPrismaCreate()
          } as PrismaClass.RecipeIngredientCreateOrConnectWithoutRecipeInput
        }) as PrismaClass.RecipeIngredientCreateOrConnectWithoutRecipeInput[]
      },
      image: this.image?.value
    }
  }

  toPrismaDelete(): PrismaClass.RecipeDeleteArgs {
    return {
      where: { id: this.id?.value }
    }
  }
}
