'use client'

import JobCard from '../(components)/JobCard'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/store/AuthContext'
import { useEffect } from 'react'
import { jobCardTypes } from '@/types/type'
import { Button } from '@/components/ui/button'
import Dialog from '../(components)/Dialog'

const Dashboard = () => {
  const { usertoken, jobs, setAddJobDialogOpen, addJobDialogOpen, setEditJob } =
    useAuthContext()

  const navigate = useRouter()

  useEffect(() => {
    if (!usertoken) {
      toast.error('Not Authenticated')
      navigate.push('/login')
    }
  }, [usertoken, navigate])

  return (
    <section
      className="w-full mx-auto px-24 py-4 relative bg-white"
      suppressHydrationWarning
    >
      <div className="flex justify-between items-center px-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm font-base text-gray-500">
            The place where you get all the info about your applications.
          </p>
        </div>
        <Button
          className="bg-blue-700 hover:cursor-pointer hover:bg-blue-600 px-8 py-3 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20"
          onClick={() => {
            setAddJobDialogOpen(!addJobDialogOpen)
            setEditJob(false)
          }}
        >
          Add Job
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 py-2 mt-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job: jobCardTypes) => (
            <div
              key={job._id}
              className="px-4 py-2 border border-gray-400 rounded-sm hover:bg-gray-100"
            >
              <JobCard
                _id={job._id}
                company={job.company}
                title={job.title}
                location={job.location}
                currentStatus={job.currentStatus}
                updatedAt={job.updatedAt}
                createdAt={job.createdAt}
                description={job.description}
                jobUrl={job.jobUrl}
                salary={job.salary}
                notes={job.notes}
                timeline={job.timeline}
              />
            </div>
          ))
        ) : (
          <div className="w-full max-h-full h-screen flex justify-center items-center">
            <p className="text-2xl">
              No jobs yet. Start tracking your applications!
            </p>
          </div>
        )}
      </div>

      {addJobDialogOpen === true && (
        <div className="w-full h-full min-h-screen backdrop-blur-lg bg-transparent absolute inset-0 z-50 flex justify-center items-center">
          <Dialog />
        </div>
      )}
    </section>
  )
}

export default Dashboard
