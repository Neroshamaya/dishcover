import { Product} from './Product'
import { ZodError } from 'zod'
describe('Product', () => {
    it('can\'t be created with an invalid id', () => {
        try {
            new Product({    
                id: 'not a uuid',
                title: 'some title',
                price: 123,
                image: 'not a link',
                description: 'some description',
                categoryId: 'e509124f-f9cc-44e4-bd31-7dfd040a88d8'
            })
        } catch (error) {
            expect(Object.getPrototypeOf(error).constructor).toBe(ZodError)
            const zodError = error as ZodError
            expect(zodError.errors[0].message).toBe('Invalid uuid')
        }

    })
    it('should have a getDTO method that returns a dto', () => {
        const productInfos ={    
            id: 'e509124f-f9cc-44e4-bd31-7dfd040a88d8', // any valid uuid
            title: 'some title',
            price: 123,
            image: 'http://anywhere.com',
            description: 'some description',
            categoryId: 'e509124f-f9cc-44e4-bd31-7dfd040a88d8'
        }
        const product = new Product(productInfos)

        expect(product.getDto).toBeDefined()
        expect(product.getDto()).toEqual(productInfos)

    })
})