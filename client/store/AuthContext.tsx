'use client'

import { fetchJob } from '@/app/api/fetch-job'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  usertoken: string | null
  setUsertoken: (token: string) => void
  logout: () => Promise<unknown>
  jobs: [] | null
  addJobDialogOpen: boolean
  setAddJobDialogOpen: (open: boolean) => void
  editJob: boolean
  setEditJob: (open: boolean) => void
  selectedJob: any | null
  setSelectedJob: (job: any) => void
  newStatus: string
  setNewStatus: (value: string) => void
  refetchJobs: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  })
  const [jobs, setJobs] = useState(null)
  const [addJobDialogOpen, setAddJobDialogOpen] = useState<boolean>(false)
  const [editJob, setEditJob] = useState<boolean>(false)
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  const [newStatus, setNewStatus] = useState<string>('')

  const navigate = useRouter()

  const setUserTokenWithStorage = (token: string) => {
    localStorage.setItem('token', token)
    setUserToken(token)
  }

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      setUserToken(null)
    } catch (error) {
      console.error('Error while logging out', error)
      return error
    }
  }

  // Fetch jobs and redirect when userToken changes
  useEffect(() => {
    const loadJobs = async () => {
      if (!userToken) return
      try {
        const response = await fetchJob(userToken)
        setJobs(response.allJobs)
        navigate.push('/dashboard')
      } catch (error) {
        console.error('Error while fetching jobs', error)
      }
    }

    loadJobs()
  }, [userToken, navigate])

  const refetchJobs = async (): Promise<void> => {
    if (!userToken) return
    try {
      const response = await fetchJob(userToken)
      setJobs(response.allJobs)
    } catch (error) {
      console.error('Error while refetching jobs', error)
    }
  }

  const value: AuthContextType = {
    usertoken: userToken,
    setUsertoken: setUserTokenWithStorage,
    logout: logout,
    jobs: jobs,
    addJobDialogOpen: addJobDialogOpen,
    setAddJobDialogOpen: setAddJobDialogOpen,
    editJob: editJob,
    setEditJob: setEditJob,
    selectedJob: selectedJob,
    setSelectedJob: setSelectedJob,
    newStatus: newStatus,
    setNewStatus: setNewStatus,
    refetchJobs: refetchJobs,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}

export default AuthContextProvider
