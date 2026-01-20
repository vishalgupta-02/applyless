'use client'

import { deleteJob } from '@/app/api/delete-job'
import { fetchSingleJob } from '@/app/api/fetch-individual-job'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/store/AuthContext'
import { jobCardTypes, timeLineProps } from '@/types/type'
import { formatDistanceToNow } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const IndividualJob = () => {
  const [currentJob, setCurrentJob] = useState<jobCardTypes>()
  const [appTimeline, setAppTimeline] = useState<timeLineProps>()
  const { id } = useParams()
  const navigate = useRouter()
  const { usertoken } = useAuthContext()

  const fetchIndividualHandle = async () => {
    try {
      if (!usertoken) {
        toast.error('You are not authorised')
        return
      }
      const result = await fetchSingleJob({ id, token: usertoken })

      if (!result?.requestedJob) {
        toast.error('Failed to fetch current job')
        return
      }

      console.log('Result from fetch single job', result)
      setCurrentJob(result.requestedJob)
      setAppTimeline(result.requestedJob?.timeline)
    } catch (error) {
      console.log('Error while fetching the job', error)
      toast.error('Fetching job failed')
    }
  }

  const parseTimeInRelative = (dateString: string) => {
    try {
      if (!dateString) {
        return ''
      }
      // const date = new Date(Number(dateString))
      console.log('Date ', dateString)
      const relativeDate = formatDistanceToNow(dateString)
      console.log('Relative date in clean', relativeDate)
      return relativeDate
    } catch (error) {
      console.log('Error in parsing date', error)
      return ''
    }
  }

  const deleteHandle = async (id: string) => {
    try {
      const userConfirmation = window.confirm(
        'Are you sure you want to delete this job',
      )
      if (!userConfirmation) {
        return
      }
      if (!usertoken) {
        return undefined
      }
      const result = await deleteJob({ id, token: usertoken })
      console.log('Result of deleting the job', result)
      toast.success('Job Deletion Successful')
    } catch (error) {
      console.log('Error while deleting the job with', error)
      toast.error('Job Deletion Failed')
    }
  }

  useEffect(() => {
    if (!usertoken) {
      toast.error('You are not authorised')
      return
    }
    console.log('Single job', currentJob)
    fetchIndividualHandle()
  }, [id, usertoken])

  return (
    <section className="container w-full flex justify-center items-center px-24 py-8">
      <div className="w-full flex flex-col gap-4">
        <div className="p-4 w-full flex justify-start">
          <Button
            onClick={() => navigate.back()}
            className="bg-blue-700 hover:cursor-pointer hover:bg-blue-600 px-8 py-3 font-semibold shadow-[0px_0px_4px_2px_rgba(255,255,225,0.2)_inset] text-shadow-sm text-shadow-white/10 ring ring-white/20"
          >
            Back
          </Button>
        </div>
        <div className="border border-gray-400 rounded-sm py-8">
          <div className="heading flex justify-between items-center px-4 py-2">
            <div>
              <h1 className="text-6xl font-bold">
                {currentJob?.company || 'Undefined'}
              </h1>
            </div>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => typeof id === 'string' && deleteHandle(id)}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
          <div className="middle px-4 py-2">
            <div className="py-1 px-2">
              <p className="text-3xl font-semibold">{currentJob?.title}</p>
            </div>
            <div className="mt-2 px-4 space-y-2">
              <p className="font-semibold flex flex-col gap-2 text-md">
                Job url{' '}
                <span
                  onClick={() => navigate.push(`/${currentJob?.jobUrl}`)}
                  className="cursor-pointer px-4 py-2 border border-gray-400 rounded-sm font-normal"
                >
                  {currentJob?.jobUrl}
                </span>
              </p>
              <p className="flex flex-col space-y-1 font-semibold">
                Job Description:
                <span className="text-sm font-normal">
                  {currentJob?.description}
                </span>
              </p>
            </div>
            <div className="mt-2 px-4">
              <p className="font-semibold py-2">
                Pay: <span className="font-normal">₹{currentJob?.salary}</span>
              </p>
            </div>
            <div className="mt-2 px-4">
              <p className="font-semibold flex flex-col space-y-1">
                Notes:
                <span className="font-normal text-sm">{currentJob?.notes}</span>
              </p>
            </div>
          </div>
          <div className="bottom px-4 py-2">
            <h1 className="text-2xl font-bold px-4 py-1">
              Application Timeline
            </h1>
            <div className="px-4 py-4 space-y-1">
              {appTimeline?.map((timeline, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-2 border border-gray-400 rounded-sm"
                >
                  <p className="font-bold">{index + 1}.</p>
                  <p className="font-semibold capitalize">{timeline.status}</p>
                  <p className="font-semibold">
                    {parseTimeInRelative(timeline.date) || '1 day'} ago
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IndividualJob
