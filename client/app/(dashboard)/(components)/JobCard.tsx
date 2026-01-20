'use client'

import { deleteJob } from '@/app/api/delete-job'
import { changeStatus } from '@/app/api/statusUpdate'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthContext } from '@/store/AuthContext'
import { jobCardTypes } from '@/types/type'
import { SquarePen, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'

const JobCard = ({
  _id,
  company,
  title,
  location,
  currentStatus,
  createdAt,
  updatedAt,
  jobUrl,
  salary,
  notes,
  description,
}: jobCardTypes) => {
  const navigate = useRouter()
  const {
    usertoken,
    setEditJob,
    setAddJobDialogOpen,
    setSelectedJob,
    refetchJobs,
  } = useAuthContext()
  const [localStatus, setLocalStatus] = useState(currentStatus)

  const changeJobStatus = async (newStatus: string) => {
    try {
      if (!_id) {
        return
      }
      if (!usertoken) {
        return
      }
      const result = await changeStatus({
        id: _id,
        token: usertoken,
        status: newStatus,
      })

      if (result.success) {
        setLocalStatus(newStatus)
        toast.success('Job status change successful')
      } else {
        toast.error('Job status change failed')
        return
      }
    } catch (error) {
      toast.error('Error changing job status')
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
      if (!result) {
        toast.error('Failed to delete job')
      }
      await refetchJobs()
      toast.success('Job Deletion Successful')
    } catch (error) {
      console.log('Error while deleting the job with', error)
      toast.error('Job Deletion Failed')
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-700 tracking-tight">
          {company}
        </h1>
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="secondary"
            className="cursor-pointer border border-gray-400"
            onClick={() => {
              setSelectedJob({
                _id,
                company,
                title,
                location,
                currentStatus,
                createdAt,
                updatedAt,
                jobUrl,
                salary,
                notes,
                description,
              })
              setEditJob(true)
              setAddJobDialogOpen(true)
            }}
          >
            <SquarePen className="w-4 h-4 text-blue-700" />
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer border border-gray-400"
            onClick={() => _id && deleteHandle(_id)}
          >
            <Trash2 className="w-4 h-4 text-red-700" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-md font-medium">{title}</p>
          <p className="text-md text-gray-700">{location}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer border border-gray-400 hover:text-blue-600"
            >
              {localStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Current Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => changeJobStatus('Applied')}>
              Applied
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeJobStatus('Screening')}>
              Screening
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeJobStatus('Interview')}>
              Interview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeJobStatus('Offer')}>
              Offer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeJobStatus('Rejected')}>
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <p className="text-md">{notes}</p>
          <p className="text-xs">{description}</p>
        </div>
        <Button
          variant="link"
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate.push(`/job/${_id}`)}
        >
          View Detail
        </Button>
      </div>
    </div>
  )
}

export default JobCard
