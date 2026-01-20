'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/store/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { createNewJob } from '@/app/api/create-job'
import { useRouter } from 'next/navigation'
import { editExistingJob } from '@/app/api/edit-job'

interface JobFormData {
  company: string
  title: string
  currentStatus: string
  description: string
  jobUrl: string
  location: string
  notes: string
  salary: string
}

const Dialog = () => {
  const navigate = useRouter()

  const {
    usertoken,
    addJobDialogOpen,
    setAddJobDialogOpen,
    editJob,
    selectedJob,
  } = useAuthContext()

  const [company, setCompany] = React.useState<string>(
    selectedJob?.company || '',
  )
  const [title, setTitle] = React.useState<string>(selectedJob?.title || '')
  const [currentStatus, setCurrentStatus] = React.useState<string>(
    selectedJob?.currentStatus || '',
  )
  const [description, setDescription] = React.useState<string>(
    selectedJob?.description || '',
  )
  const [jobUrl, setJobUrl] = React.useState<string>(selectedJob?.jobUrl || '')
  const [location, setLocation] = React.useState<string>(
    selectedJob?.location || '',
  )
  const [notes, setNotes] = React.useState<string>(selectedJob?.notes || '')
  const [salary, setSalary] = React.useState<string>(selectedJob?.salary || '')

  const clearAllFields = (): void => {
    setCompany('')
    setTitle('')
    setCurrentStatus('')
    setDescription('')
    setJobUrl('')
    setLocation('')
    setNotes('')
    setSalary('')
  }

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    try {
      const body: JobFormData = {
        company: company,
        title: title,
        currentStatus: currentStatus,
        description: description,
        jobUrl: jobUrl,
        location: location,
        notes: notes,
        salary: salary,
      }
      if (
        !body.company ||
        !body.title ||
        !body.currentStatus ||
        !body.description ||
        !body.jobUrl ||
        !body.location ||
        !body.notes ||
        !body.salary
      ) {
        toast.error('All fields are required')
        return
      }
      const result = await createNewJob({ token: usertoken, userData: body })

      if (!result) {
        toast.error('New Job Creation Failed')
        navigate.push('/dashboard')
        return
      }
      navigate.push('/dashboard')
    } catch (error) {
      toast.error('Error creating new job')
    }
  }

  const editHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    try {
      const jobData: JobFormData = {
        title: title,
        company: company,
        currentStatus: currentStatus,
        description: description,
        jobUrl: jobUrl,
        location: location,
        notes: notes,
        salary: salary,
      }

      const result = await editExistingJob({
        token: usertoken,
        jobId: selectedJob?._id,
        jobData: jobData,
      })

      toast.success('Editing the job successful')
    } catch (error) {
      toast.error('Error creating new job')
    }
  }

  const submissionHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    if (editJob) {
      editHandler(e)
    } else {
      submitHandler(e)
    }
  }

  return (
    <>
      <div className="w-full max-w-3xl h-full max-h-screen flex justify-center items-center">
        <form
          className="w-full max-w-xl space-y-2"
          onSubmit={(e) => submissionHandler(e)}
        >
          <div className="w-full flex justify-between items-center">
            <div className="space-y-0.5">
              <p className="text-2xl text-[#3B82F6] font-semibold">Add Job</p>
              <p className="text-sm">
                Fill few details to keep track of your job applications.
              </p>
            </div>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setAddJobDialogOpen(!addJobDialogOpen)}
            >
              <X className="w-5 h-5 text-gray-900" />
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border border-gray-600 outline-none focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-600 outline-none focus-visible:ring-0"
            />
          </div>
          <div className="flex justify-between items-center my-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer w-full max-w-48 text-white">
                  {currentStatus || 'Current'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setCurrentStatus('Wishlist')}>
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentStatus('Applied')}>
                  Applied
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentStatus('Screening')}>
                  Screening
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentStatus('Interview')}>
                  Interview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentStatus('Offer')}>
                  Offer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentStatus('Rejected')}>
                  Rejected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentStatus('Ghosted')}>
                  Ghosted
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer w-full max-w-48">
                  {location || 'Location'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setLocation('Remote')}>
                  Remote
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('Hybrid')}>
                  Hybrid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('Onsite')}>
                  Onsite
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-600 outline-none focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border border-gray-600 outline-none focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label>Salary</Label>
            <Input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="border border-gray-600 outline-none focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label>Job Url</Label>
            <Input
              type="text"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              className="border border-gray-600 outline-none focus-visible:ring-0"
            />
          </div>
          <div className="flex justify-between items-center my-4">
            {!editJob && (
              <Button className="w-full max-w-56" onClick={clearAllFields}>
                Clear All
              </Button>
            )}
            <Button className="w-full max-w-56 bg-[#3B82F6] cursor-pointer">
              {editJob === true ? 'Edit' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Dialog
