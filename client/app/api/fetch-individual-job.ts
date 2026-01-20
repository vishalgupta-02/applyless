import axios from 'axios'
import { ParamValue } from 'next/dist/server/request/params'

const fetchSingleJob = async ({
  id,
  token,
}: {
  id: ParamValue
  token: string
}) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job/${id}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )

    const data = response.data

    return data
  } catch (error) {
    console.log('Error in fetching single job api call', error)
    return error
  }
}

export { fetchSingleJob }
