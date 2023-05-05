import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import Routeur from './Routeur'

export default function App() {
  const userInitialContext = useContext(UserContext)

  return (
    <UserContext.Provider value={userInitialContext}>
      <Routeur />
    </UserContext.Provider>
  )
}
