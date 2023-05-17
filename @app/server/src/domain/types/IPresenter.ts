import { ResponseType } from '@dishcover/shared/types/responses'

export interface Ipresenter<UseCaseResponse> {
  present(useCaseResponse: UseCaseResponse): ResponseType
}
