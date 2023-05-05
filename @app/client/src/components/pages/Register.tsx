import Authentication from '../templates/Authentication'
import UserContext from '../../contexts/UserContext'
import * as apiService from '../../services/apiService'
import { useContext } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { RegisterQuery } from '@dishcover/shared'
import { useNavigate } from 'react-router-dom'
import Layout from '../templates/Layout'

export default function Register() {
  const context = useContext(UserContext)
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RegisterQuery> = async (credentials) => {
    const response = await apiService.register(credentials)
    if (!response?.error && response?.data?.token) {
      context.setConnectedUser({ ...response?.data?.user, token: response?.data?.token })
      navigate('/create')
    }
  }

  return (
    <Layout>
      <Authentication onSubmit={onSubmit} />
    </Layout>
  )
}
