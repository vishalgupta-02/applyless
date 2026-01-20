import { formDataTypes } from '@/types/type'
import axios from 'axios'

const createNewJob = async ({
  token,
  userData,
}: {
  token: string | null
  userData: formDataTypes
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job/create-job`,
      {
        company: userData.company,
        title: userData.title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const data = response.data

    return data
  } catch (error) {
    console.log('Error while creating job', error)
    return error
  }
}

export { createNewJob }
