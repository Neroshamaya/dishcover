import axios, { isCancel, AxiosError } from 'axios'
import { API_URL } from '../configuration'
import { LoginQuery } from '@dishcover/shared'

export function async login(args: LoginQuery) {
const response = axios.post(`${API_URL}/login/password`, args)
}