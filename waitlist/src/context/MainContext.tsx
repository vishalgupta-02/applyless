import React, { createContext, useState, useContext, useEffect } from 'react'

interface MainContextType {
  subscribed: boolean
  setSubscribed: (value: boolean) => void
}

export const MainContext = createContext<MainContextType | undefined>(undefined)

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscribed, setSubscribed] = useState<boolean>(() => {
    const saved = localStorage.getItem('subscribed')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('subscribed', JSON.stringify(subscribed))
  }, [subscribed])

  const value: MainContextType = {
    subscribed,
    setSubscribed,
  }

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

export const useMainContext = () => {
  const context = useContext(MainContext)

  if (!context) {
    throw new Error('useMainContext must be used within MainContextProvider')
  }
  return context
}

export default MainContextProvider
