import React, { useState } from 'react'
import UserContext, { ConnectedUser } from '../contexts/UserContext'

export default function App() {
  const [connectedUser, setConnectedUser] = useState<ConnectedUser | null>(null)

  return (
    <UserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {/* Your app content goes here */}
    </UserContext.Provider>
  )
}
