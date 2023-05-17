import { Query } from '@dishcover/shared/types/requests'
export default interface IUseCase<Query, Response = void> {
  execute(queryOrCommand: Query): Promise<Response>
}
