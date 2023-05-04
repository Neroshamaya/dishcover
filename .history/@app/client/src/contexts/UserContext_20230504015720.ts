import { createContext } from 'react'
import { UserDtoType } from '@dishcover/shared'

interface UserContextProps {
  connectedUser: {
    id: number
    username: string
    email: string
  } | null
  setConnectedUser: (user: User | null) => void
}

const UserContext = createContext<UserContextProps>({
  connectedUser: null,
  setConnectedUser: () => {}
})

export default UserContext
