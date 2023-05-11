import { RegisterQuery } from '@dishcover/shared/types/requests'
import { useContext } from 'react'
import { redirect } from 'react-router-dom'

import UserContext from '../../contexts/UserContext'
import * as apiService from '../../services/apiService'
import RegisterForm from '../organisms/RegisterForm'
import Layout from '../templates/Layout'

export default function Register() {
  const context = useContext(UserContext)

  const onSubmit = async (credentials: RegisterQuery) => {
    const response = await apiService.register(credentials)
    if (!response?.error && response?.data?.token) {
      context.setConnectedUser({ ...response?.data?.user, token: response?.data?.token })
      redirect('/create')
      return
    }
    return response?.error
  }

  return (
    <Layout>
      <RegisterForm onSubmit={onSubmit} />
    </Layout>
  )
}
