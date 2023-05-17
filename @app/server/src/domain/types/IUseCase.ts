export default interface IUseCase<Query, Response = void> {
  execute(queryOrCommand: Query): Promise<Response>
}
