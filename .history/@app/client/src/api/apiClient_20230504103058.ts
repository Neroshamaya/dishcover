import axios, { isCancel, AxiosError, AxiosResponse } from 'axios'
import { API_URL } from '../configuration'
import { LoginQuery, loginResponseBody } from '@dishcover/shared'
const instance = axios.create({
  baseURL: `${API_URL}/`,
  timeout: 1000
});
export async function login(args: LoginQuery) {
  try {
    const {data}: AxiosResponse = await instance.post('/login/password', args)
    return {data}
  } catch (error: AxiosError) {
    if (error.response) {
      return {error: error.response.data}
    }
    throw error
  }
  