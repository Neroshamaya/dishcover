export default interface UseCase<QueryOrCOmmandInterface> {
    execute(queryOrCommand: QueryOrCOmmandInterface): Promise<unknown | void>
}