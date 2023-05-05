import { createContext } from 'react'
import { UserDtoType } from '@dishcover/shared'

export type ConnectedUser = UserDtoType & { token: string }

interface UserContextProps {
  connectedUser: ConnectedUser | null
  setConnectedUser: (user: ConnectedUser) => void
  unsetConnectedUser: () => void
}

const UserContext = createContext<UserContextProps>({
  connectedUser: null,
  unsetConnectedUser: () => {
    localStorage.removeItem('user')
  },
  setConnectedUser: (user: ConnectedUser) => {
    localStorage.setItem('user', JSON.stringify(user))
  }
})

export default UserContext
