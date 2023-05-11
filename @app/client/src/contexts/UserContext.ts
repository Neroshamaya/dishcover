import { UserDtoType } from '@dishcover/shared/types/resources/User'
import { createContext } from 'react'

export type ConnectedUser = UserDtoType & { token: string }

interface UserContextProps {
  getConnectedUser: () => ConnectedUser | null
  setConnectedUser: (user: ConnectedUser) => void
  unsetConnectedUser: () => void
}

const UserContext = createContext<UserContextProps>({
  getConnectedUser: () => {
    const existingUserInfos = localStorage.getItem('user')
    if (existingUserInfos) {
      return JSON.parse(existingUserInfos)
    }
    return null
  },
  unsetConnectedUser: () => {
    localStorage.removeItem('user')
  },
  setConnectedUser: (user: ConnectedUser) => {
    localStorage.setItem('user', JSON.stringify(user))
  }
})

export default UserContext
