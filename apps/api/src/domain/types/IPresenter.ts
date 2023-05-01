export interface IPresenter<InputType, OutputType> {
  present(data: InputType): OutputType
}
