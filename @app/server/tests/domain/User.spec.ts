import RecipeIngredient from '../../src/domain/models/RecipeIngredient'
import {
  Prisma,
  RecipeIngredient as PrismaRecipeIngredient,
  Ingredient as PrismaIngredient
} from '@prisma/client'
import Id from '../../src/domain/valueObjects/Id'
import Email from '../../src/domain/valueObjects/Email'
import User from '../../src/domain/models/User'
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

describe('User', () => {
  describe('fromPrisma', () => {
    it('should create a User instance from a Prisma user', () => {
      const prismaUser = {
        id: '645be700c18dab1da9779ff8',
        email: 'test@example.com',
        salt: 'salt123',
        password: 'password123',
        created: new Date(),
        updated: new Date()
      }
      const expectedUser = new User({
        id: new Id('645be700c18dab1da9779ff8'),
        email: new Email('test@example.com'),
        salt: 'salt123',
        password: 'password123',
        created: prismaUser.created,
        updated: prismaUser.updated
      })
      expect(User.fromPrisma(prismaUser)).toBeInstanceOf(User)
    })
  })

  describe('toResponse', () => {
    it('should convert a User instance to a response object', () => {
      const user = new User({
        id: new Id('645be700c18dab1da9779ff8'),
        email: new Email('test@example.com'),
        salt: 'salt123',
        password: 'password123',
        created: new Date(),
        updated: new Date()
      })
      const expectedResponse = {
        id: '645be700c18dab1da9779ff8',
        email: 'test@example.com'
      }
      expect(user.toResponse()).toEqual(expect.objectContaining(expectedResponse))
    })
  })

  describe('toPrismaCreate', () => {
    it('should convert a User instance to a Prisma user create input', () => {
      const user = new User({
        email: new Email('test@example.com'),
        salt: 'salt123',
        password: 'password123'
      })
      const expectedPrismaCreateInput = {
        email: 'test@example.com',
        salt: 'salt123',
        password: 'password123'
      }
      expect(user.toPrismaCreate()).toEqual(expectedPrismaCreateInput)
    })
  })

  describe('toPrismaUpdate', () => {
    it('should convert a User instance to a Prisma user update input', () => {
      const user = new User({
        id: new Id('645be700c18dab1da9779ff8'),
        email: new Email('test@example.com'),
        salt: 'salt123',
        password: 'password123'
      })
      const expectedPrismaUpdateInput = {
        email: 'test@example.com',
        salt: 'salt123',
        password: 'password123'
      }
      expect(user.toPrismaUpdate()).toEqual(expectedPrismaUpdateInput)
    })
  })

  describe('toPrismaDelete', () => {
    it('should convert a User instance to a Prisma user delete args', () => {
      const user = new User({
        id: new Id('645be700c18dab1da9779ff8'),
        email: new Email('test@example.com'),
        salt: 'salt123',
        password: 'password123'
      })
      const expectedPrismaDeleteArgs = {
        where: { id: '645be700c18dab1da9779ff8' }
      }
      expect(user.toPrismaDelete()).toEqual(expectedPrismaDeleteArgs)
    })
  })
})
