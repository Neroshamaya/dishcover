import { ResponseType } from '@dishcover/shared/types/responses'

export default interface IUseCase<Query = void> {
  execute(queryOrCommand: Query): Promise<ResponseType | void>
}
