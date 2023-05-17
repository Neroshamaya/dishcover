import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import {
  Prisma,
  Recipe as PrismaRecipe,
  User as PrismaUser,
  Ingredient as PrismaIngredient,
  RecipeIngredient as PrismaRecipeIngredient
} from '@prisma/client'
import Ingredient from '@/domain/models/Ingredient'
import Id from '@/domain/valueObjects/Id'
Id
import Uri from '@/domain/valueObjects/Uri'
import Recipe from '@/domain/models/Recipe'
import { PrismaUserToModel } from './PrismaUserToModel'
import { PrismaRecipeIngredientToModel } from './PrismaRecipeIngredientToModel'

export class PrismaRecipeToModel {
  static adapt(
    prismaRecipe: PrismaRecipe & {
      author: PrismaUser
      ingredients: (PrismaRecipeIngredient & {
        details?: PrismaIngredient
      })[]
    }
  ): Recipe {
    {
      return new Recipe({
        author: PrismaUserToModel.adapt(prismaRecipe.author),
        authorId: new Id(prismaRecipe.authorId),
        created: prismaRecipe.created as Date,
        updated: prismaRecipe.updated as Date,
        description: prismaRecipe.description as string,
        id: new Id(prismaRecipe.id),
        image: Uri.from(prismaRecipe.image),
        recipeIngredients: prismaRecipe.ingredients.map((i) =>
          PrismaRecipeIngredientToModel.adapt(i)
        ),
        label: prismaRecipe.label as string,
        recipeIngredientIds: prismaRecipe.recipeIngredientIds.map((prismaId) => new Id(prismaId))
      })
    }
  }
}
