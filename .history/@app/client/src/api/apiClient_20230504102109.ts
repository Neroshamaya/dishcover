import axios, { isCancel, AxiosError } from 'axios'
import { API_URL } from '../configuration'
import { LoginQuery } from '@dishcover/shared'

export async function login(args: LoginQuery) {
  try {
    const response = await axios.post(`${API_URL}/login/password`, args)
}
  } catch (error) {
    
  }
  
