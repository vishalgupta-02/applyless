'use client'

import { deleteJob } from '@/app/api/delete-job'
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
import { toast } from 'sonner'

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
  const { usertoken, setEditJob, setAddJobDialogOpen, setSelectedJob } =
    useAuthContext()

  const deleteHandle = async (id: string) => {
    try {
      const userConfirmation = window.confirm(
        'Are you sure you want to delete this job'
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

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-700 tracking-tight">
          {company}
        </h1>
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            className="cursor-pointer"
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
            <SquarePen className="w-4 h-4 text-blue-300" />
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => _id && deleteHandle(_id)}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
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
            <Button variant="outline" size="lg" className="cursor-pointer">
              {currentStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Current Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Applied</DropdownMenuItem>
            <DropdownMenuItem>Screening</DropdownMenuItem>
            <DropdownMenuItem>Interview</DropdownMenuItem>
            <DropdownMenuItem>Offer</DropdownMenuItem>
            <DropdownMenuItem>Rejected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <p className="text-md">{notes}</p>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  )
}

export default JobCard
