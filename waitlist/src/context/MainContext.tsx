import React, { createContext, useState, useContext, useEffect } from 'react'

interface MainContextType {
  subscribed: boolean
  setSubscribed: (value: boolean) => void
}

interface StoredData {
  value: boolean
  timestamp: number
}

const EXPIRATION_TIME = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

const isDataExpired = (data: StoredData): boolean => {
  const now = Date.now()
  return now - data.timestamp > EXPIRATION_TIME
}

const MainContext = createContext<MainContextType | undefined>(undefined)

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [subscribed, setSubscribed] = useState<boolean>(() => {
    const saved = localStorage.getItem('subscribed')
    if (!saved) return false

    try {
      const data: StoredData = JSON.parse(saved)
      if (isDataExpired(data)) {
        localStorage.removeItem('subscribed')
        return false
      }
      return data.value
    } catch {
      localStorage.removeItem('subscribed')
      return false
    }
  })

  useEffect(() => {
    const data: StoredData = {
      value: subscribed,
      timestamp: Date.now(),
    }
    localStorage.setItem('subscribed', JSON.stringify(data))
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
