import { PresenterInterface } from '../../../types/PresenterInterface'
import type {DomainModelInterface} from '../../../types/DomainModelInterface'
import type { DTOType } from '../../../types/DTO'

export default class JSONPresenter implements PresenterInterface<DomainModelInterface<DTOType>[], string> {
    present(data: Array<DomainModelInterface<DTOType>>): string {
        return JSON.stringify(data.map(p => p.getDto()))
    }
}