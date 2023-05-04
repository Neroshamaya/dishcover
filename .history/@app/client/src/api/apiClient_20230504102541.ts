import axios, { isCancel, AxiosError } from 'axios'
import { API_URL } from '../configuration'
import { LoginQuery, loginResponseBody } from '@dishcover/shared'
const instance = axios.create({
  baseURL: `${API_URL}/`,
  timeout: 1000
});
export async function login(args: LoginQuery) {
  const returned =
  try {
    const response: loginResponseBody = await axios.post(`${API_URL}/login/password`, args)
    return {data: response}
  } catch (error: ) {
    return 
  }
  
