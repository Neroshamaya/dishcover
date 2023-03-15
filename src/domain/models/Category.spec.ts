import { Category } from './Category'
import { ZodError } from 'zod'
describe('Category', () => {
    it('can\'t be created with an invalid id', () => {
        try {
            new Category({
                id: '123',
                title: 'only title'
            })
        } catch (error) {
            expect(Object.getPrototypeOf(error).constructor).toBe(ZodError)
            const zodError = error as ZodError
            expect(zodError.errors[0].message).toBe('Invalid uuid')
        }

    })
    it('should have a getDTO method that returns a dto', () => {
        const categoryInfos = {
            id: 'e509124f-f9cc-44e4-bd31-7dfd040a88d8', // any valid uuid
            title: 'some title'
        }
        const category = new Category(categoryInfos)

        expect(category.getDto).toBeDefined()
        expect(category.getDto()).toEqual(categoryInfos)

    })
})