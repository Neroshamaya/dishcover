import { IPresenter } from '../../domain/types/IPresenter'
import type { IDomainModel } from '../../domain/types/IDomainModel'
import type { DTOType } from '../../domain/types/DTO'

export type SupportedFormats =
  | string
  | Array<IDomainModel<DTOType>>
  | IDomainModel<DTOType>
  | null
  | boolean
  | DTOType
  | Array<DTOType>

export default class JSONPresenter implements IPresenter<SupportedFormats, string> {
  present(data: SupportedFormats): string {
    if (typeof data === 'string') {
      return data
    }

    return JSON.stringify(data)
  }
}
