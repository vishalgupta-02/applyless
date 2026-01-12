import axios from 'axios'

interface JobData {
  company: string
  title: string
  currentStatus: string
  description: string
  jobUrl: string
  location: string
  notes: string
  salary: string
}

interface editingJobProps {
  token: string | null
  jobId: string
  jobData: JobData
}

const editExistingJob = async ({ token, jobId, jobData }: editingJobProps) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job/change/${jobId}`,
      {
        company: jobData.company,
        title: jobData.title,
        currentStatus: jobData.currentStatus,
        description: jobData.description,
        jobUrl: jobData.jobUrl,
        location: jobData.location,
        notes: jobData.notes,
        salary: jobData.salary,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = response.data

    return data
  } catch (error) {
    console.log('Error while editing the job', error)
    return error
  }
}

export { editExistingJob }
