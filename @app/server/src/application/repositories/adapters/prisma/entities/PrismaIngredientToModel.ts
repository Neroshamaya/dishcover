import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import { Prisma, Ingredient as PrismaIngredient } from '@prisma/client'
import Ingredient from '@/domain/models/Ingredient'
import Id from '@/domain/valueObjects/Id'
Id
import Uri from '@/domain/valueObjects/Uri'

export class PrismaIngredientToModel {
  static adapt(prismaIngredient: PrismaIngredient): Ingredient {
    {
      return new Ingredient({
        id: Id.from(prismaIngredient.id),
        label: prismaIngredient.label as string,
        description: prismaIngredient.description as string,
        iconLink: prismaIngredient.iconLink
          ? new Uri(prismaIngredient.iconLink as string)
          : undefined,
        authorId: new Id(prismaIngredient.authorId as string)
      })
    }
  }
}
