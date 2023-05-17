import {
  Ingredient as PrismaIngredient,
  Recipe as PrismaRecipe,
  RecipeIngredient as PrismaRecipeIngredient,
  User as PrismaUser
} from '@prisma/client'

import Id from '@/domain/valueObjects/Id'
Id
import Recipe from '@/domain/models/Recipe'
import Uri from '@/domain/valueObjects/Uri'

import { PrismaRecipeIngredientToModel } from './PrismaRecipeIngredientToModel'
import { PrismaUserToModel } from './PrismaUserToModel'

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
