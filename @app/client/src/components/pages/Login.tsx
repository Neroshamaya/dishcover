import { LoginQuery } from '@dishcover/shared/types/requests/Authentication'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import UserContext from '../../contexts/UserContext'
import * as apiService from '../../services/apiService'
import LoginForm from '../organisms/LoginForm'
import Layout from '../templates/Layout'

export default function Login() {
  const context = useContext(UserContext)
  const navigate = useNavigate()

  const onSubmit = async (credentials: LoginQuery) => {
    const response = await apiService.login(credentials)
    if (!response?.error && response?.data?.token) {
      context.setConnectedUser({ ...response?.data?.user, token: response?.data?.token })
      navigate('/create')
      return
    }
    return response?.error
  }

  return (
    <Layout>
      <LoginForm onSubmit={onSubmit} />
    </Layout>
  )
}
