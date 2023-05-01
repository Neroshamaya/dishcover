export default interface IUseCase<IQueryOrCommand> {
    execute(queryOrCommand: IQueryOrCommand): Promise<unknown>
}