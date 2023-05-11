import { CreateIngredientQuery } from '@dishcover/shared/types/requests'
import PrismaClient, { Prisma, User as PrismaUser } from '@prisma/client'

import Id from '../valueObjects/Id'
import Uri from '../valueObjects/Uri'
import User from './User'
import { IngredientDtoType, UserDtoType } from '@dishcover/shared/types/resources'

interface IngredientParams {
  readonly id?: Id
  readonly label: string
  readonly description?: string | null
  readonly iconLink?: Uri
  readonly authorId: Id
  readonly author?: PrismaUser | UserDtoType
}

function isPrismaUser(user: PrismaUser | UserDtoType | undefined): user is PrismaUser {
  return user !== undefined && 'password' in user
}

export default class Ingredient {
  readonly id?
  readonly label
  readonly description?
  readonly iconLink?
  readonly authorId: Id
  readonly author?: User | UserDtoType

  constructor({ id, label, description, iconLink, authorId, author }: IngredientParams) {
    this.id = id
    this.label = label
    this.description = description
    this.iconLink = iconLink
    this.authorId = authorId
    this.author = isPrismaUser(author) ? User.fromPrisma(author) : author
  }

  static fromPrisma(prismaIngredient: PrismaClient.Ingredient): Ingredient {
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

  static fromCreateIngredientQuery(query: CreateIngredientQuery): Ingredient {
    return new Ingredient({
      ...query,
      id: query.id && query.id !== undefined ? new Id(query.id as string) : undefined,
      iconLink: Uri.from(query.iconLink),
      authorId: new Id(query.authorId as string)
    })
  }

  toResponse(): IngredientDtoType {
    return {
      id: this.id?.value,
      label: this.label,
      description: this.description,
      iconLink: this.iconLink?.value,
      authorId: this.authorId?.value
    }
  }

  toPrismaCreate(): Prisma.IngredientCreateInput {
    return {
      label: this.label,
      description: this.description,
      iconLink: this.iconLink?.value,
      author: {
        connect: {
          id: this.authorId?.value
        }
      }
    }
  }
  toPrismaUpdate(): Prisma.IngredientUpdateInput {
    return {
      label: this.label,
      description: this.description,
      iconLink: this.iconLink?.value,
      author: {
        connect: {
          id: this.authorId?.value
        }
      }
    }
  }
  toPrismaDelete(): Prisma.IngredientDeleteArgs {
    return {
      where: { id: this.id?.value }
    }
  }
}
