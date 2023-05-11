import PrismaClient, { Prisma } from '@prisma/client'
import Ingredient from './Ingredient'
import Id from '../valueObjects/Id'
import { IngredientDtoType, RecipeIngredientDtoType } from '@dishcover/shared/types/resources'
interface RecipeIngredientParams {
  readonly id?: Id
  readonly ingredientId: Id
  readonly quantity: number
  readonly recipeId?: Id
  readonly details?: Ingredient
}
export default class RecipeIngredient {
  readonly id?
  readonly ingredientId
  readonly quantity
  readonly recipeId?
  readonly details?: Ingredient
  constructor({ id, ingredientId, quantity, recipeId, details }: RecipeIngredientParams) {
    this.id = id
    this.ingredientId = ingredientId
    this.quantity = quantity
    this.recipeId = recipeId
    this.details = details
  }

  static fromPrisma(
    prismaRecipeIngredient: PrismaClient.RecipeIngredient & {
      details?: PrismaClient.Ingredient
    }
  ): RecipeIngredient {
    return new RecipeIngredient({
      id: new Id(prismaRecipeIngredient.id),
      ingredientId: new Id(prismaRecipeIngredient.ingredientId),
      quantity: prismaRecipeIngredient.quantity as number,
      recipeId: new Id(prismaRecipeIngredient.recipeId),
      details: Ingredient.fromPrisma(prismaRecipeIngredient.details as PrismaClient.Ingredient)
    })
  }

  toResponse(): RecipeIngredientDtoType {
    return {
      id: this.id?.value as string,
      ingredientId: this.ingredientId.value,
      quantity: this.quantity,
      recipeId: this.recipeId?.value as string,
      details: this.details?.toResponse()
    }
  }

  toPrismaCreate(): Prisma.RecipeIngredientCreateInput {
    return {
      quantity: this.quantity,
      details: { connect: { id: this.ingredientId.value } }
    }
  }
  toPrismaUpdate(): Prisma.RecipeIngredientUpdateInput {
    return {
      quantity: this.quantity
    }
  }
  toPrismaDelete(): Prisma.RecipeIngredientDeleteArgs {
    return {
      where: { id: this.id?.value }
    }
  }
}
