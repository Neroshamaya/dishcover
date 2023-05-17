import { UpdateRecipeQuery } from '@dishcover/shared/types/requests'
import { CreateRecipeIngredientQuery } from '@dishcover/shared/types/requests'
import { RecipeIngredientDtoType } from '@dishcover/shared/types/resources'

export class RecipeUpdateToPrismaAdapter {
  static adapt({ authorId, description, label, recipeIngredients, image, id }: UpdateRecipeQuery) {
    let sortedRecipeIngredients: {
      toKeep: RecipeIngredientDtoType[]
      toCreate: CreateRecipeIngredientQuery[]
    } = { toCreate: [], toKeep: [] }

    sortedRecipeIngredients = recipeIngredients.reduce((acc, ingredient) => {
      if ('id' in ingredient) {
        acc.toKeep.push(ingredient)
      } else {
        acc.toCreate.push(ingredient)
      }
      return acc
    }, sortedRecipeIngredients)

    return {
      where: {
        id
      },
      data: {
        label,
        authorId,
        description,
        ingredients: {
          deleteMany: {
            recipeId: id,
            ingredientId: {
              notIn: sortedRecipeIngredients.toKeep.map((i) => i.id)
            }
          },
          create: sortedRecipeIngredients.toCreate,
          connect: sortedRecipeIngredients.toKeep
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
