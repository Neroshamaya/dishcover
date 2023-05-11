import { LoginQuery, Query } from './requests'

interface ErrorDetails<T> {
  fields?: (keyof T)[]
  message?: string | undefined
}
export interface ApiError<T extends Record<string, unknown>> {
  details?: ErrorDetails<T>[]
  message: string
  code:
    | IWrongEmailPasswordComboError['code']
    | IValidationError['code']
    | IUniqueConstraintError['code']
  status: number
}

export interface IUniqueConstraintError extends ApiError<Query> {
  code: 'UniqueConstraintError'
}

export interface IValidationError extends ApiError<Query> {
  code: 'ValidationError'
}

export interface IWrongEmailPasswordComboError extends ApiError<LoginQuery> {
  code: 'WrongEmailPasswordComboError'
}
