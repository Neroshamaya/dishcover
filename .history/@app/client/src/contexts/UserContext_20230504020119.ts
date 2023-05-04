import { createContext } from 'react'
import { UserDtoType } from '@dishcover/shared'

interface UserContextProps {
  connectedUser: (UserDtoType & { token: string }) | null
  setConnectedUser: (user: UserDtoType | null) => void
}

const UserContext = createContext<UserContextProps>({
  connectedUser: null,
  setConnectedUser: () => {}
})

export default UserContext
