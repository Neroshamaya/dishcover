export interface PresenterInterface<InputType, OutputType> {
    present(data: InputType): OutputType
}