import { PresenterInterface } from '../../../types/PresenterInterface'
import { Product } from '../../domain/models/Product'

export default class JSONProductListPresenter implements PresenterInterface<Product[], string> {
    present(data: Product[]): string {
        return JSON.stringify(data.map(p => p.getDto()))
    }
}