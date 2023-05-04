import React, { useState } from 'react'
import UserContext from './UserContext'
import { UserDtoType } from '@dishcover/shared'

export default function App() {
  const [connectedUser, setConnectedUser] = useState<UserDtoType | null>(null)

  return (
    <UserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {/* Your app content goes here */}
    </UserContext.Provider>
  )
}
