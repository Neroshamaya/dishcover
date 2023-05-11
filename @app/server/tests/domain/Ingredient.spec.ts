import Ingredient from '../../src/domain/models/Ingredient'
import Id from '../../src/domain/valueObjects/Id'
import Uri from '../../src/domain/valueObjects/Uri'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

describe('Ingredient', () => {
  it('should create an ingredient instance', () => {
    const ingredientData = {
      id: new Id('645bea4784be9965dbfc3a74'),
      label: 'Test Ingredient',
      description: 'This is a test ingredient',
      iconLink: new Uri('https://example.com/test'),
      authorId: new Id('645bea4784be9965dbfc3a74')
    }
    const ingredient = new Ingredient(ingredientData)

    expect(ingredient).toBeInstanceOf(Ingredient)
    expect(ingredient.id).toBe(ingredientData.id)
    expect(ingredient.label).toBe(ingredientData.label)
    expect(ingredient.description).toBe(ingredientData.description)
    expect(ingredient.iconLink).toBe(ingredientData.iconLink)
    expect(ingredient.authorId).toBe(ingredientData.authorId)
  })

  it('should convert data from Prisma into an ingredient instance', () => {
    const prismaData = {
      id: '645bea4784be9965dbfc3a74',
      label: 'Test Ingredient',
      description: 'This is a test ingredient',
      iconLink: 'https://example.com/test',
      authorId: '645bea4784be9965dbfc3a74'
    }
    const expectedIngredientData = {
      id: new Id(prismaData.id),
      label: prismaData.label,
      description: prismaData.description,
      iconLink: new Uri(prismaData.iconLink),
      authorId: new Id(prismaData.authorId)
    }
    const ingredient = Ingredient.fromPrisma(prismaData)

    expect(ingredient).toBeInstanceOf(Ingredient)
  })

  it('should convert a CreateIngredientQuery into an ingredient instance', () => {
    const createIngredientQuery = {
      id: '645be700c18dab1da9779ff8',
      label: 'Test Ingredient',
      description: 'This is a test ingredient',
      iconLink: 'https://example.com/test',
      authorId: '645be700c18dab1da9779ff8'
    }
    const expectedIngredientData = {
      id: new Id(createIngredientQuery.id),
      label: createIngredientQuery.label,
      description: createIngredientQuery.description,
      iconLink: new Uri(createIngredientQuery.iconLink),
      authorId: new Id(createIngredientQuery.authorId)
    }
    const ingredient = Ingredient.fromCreateIngredientQuery(createIngredientQuery)

    expect(ingredient).toBeInstanceOf(Ingredient)
  })

  it('should convert an ingredient instance into a response object', () => {
    const ingredientData = {
      id: new Id('645be700c18dab1da9779ff8'),
      label: 'Test Ingredient',
      description: 'This is a test ingredient',
      iconLink: new Uri('https://example.com/test'),
      authorId: new Id('645be700c18dab1da9779ff8')
    }
    const ingredient = new Ingredient(ingredientData)
    const expectedResponse = {
      id: ingredient.id?.value,
      label: ingredient.label,
      description: ingredient.description,
      iconLink: ingredient.iconLink?.value,
      authorId: ingredient.authorId?.value
    }

    expect(ingredient.toResponse()).toEqual(expectedResponse)
  })

  it('should convert an ingredient instance into a Prisma create input', () => {
    const ingredientData = {
      id: new Id('645be700c18dab1da9779ff8'),
      label: 'Test Ingredient',
      description: 'This is a test ingredient',
      iconLink: new Uri('https://example.com/test'),
      authorId: new Id('645be700c18dab1da9779ff8')
    }
    const ingredient = new Ingredient(ingredientData)
    const expectedPrismaCreateInput = {
      label: ingredient.label,
      description: ingredient.description,
      iconLink: ingredient.iconLink?.value,
      author: { connect: { id: ingredient.authorId?.value } }
    }
    expect(ingredient.toPrismaCreate()).toEqual(expectedPrismaCreateInput)
  })
})
