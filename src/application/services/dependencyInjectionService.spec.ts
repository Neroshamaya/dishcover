import container from './dependencyInjectionService'

describe('Dependency injection container', () => {
    it('should should be able to register and retrieve modules', () => {
        expect(container).toBeDefined()
        expect(container.hasRegistration('Category')).toBe(true)
        expect(container.resolve('Category')({id: 'e509124f-f9cc-44e4-bd31-7dfd040a88d8', title: 'some title'})).toBe('yolo')
    })
})