import { CreateRecipeQuery } from '@dishcover/shared/types/requests'

import { RecipeIngredientCreateToPrismaAdapter } from '../recipeIngredient/RecipeIngredientCreateToPrismaAdapter'

export class RecipeCreateToPrismaAdapter {
  static adapt({ authorId, description, label, recipeIngredients, image }: CreateRecipeQuery) {
    return {
      data: {
        label,
        description,
        author: {
          connect: {
            id: authorId
          }
        },
        ingredients: {
          create: recipeIngredients.map((i) => RecipeIngredientCreateToPrismaAdapter.adapt(i).data)
        },
        image
      },
      include: {
        ingredients: {
          include: {
            details: true
          }
        },
        author: true
      }
    }
  }
}
