import React, { useState } from 'react'
import UserContext from './UserContext'

export default function App() {
  const [connectedUser, setConnectedUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {/* Your app content goes here */}
    </UserContext.Provider>
  )
}
