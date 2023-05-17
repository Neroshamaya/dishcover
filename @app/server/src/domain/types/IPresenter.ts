import { ResponseType } from '@dishcover/shared/types/responses'

export interface Ipresenter<UseCaseResponse, T extends ResponseType> {
  present(useCaseResponse: UseCaseResponse): T
}
