import axios from 'axios'

const changeStatus = async ({
  id,
  token,
  status,
}: {
  id: string
  token: string
  status: string
}) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job/${id}/status`,
      {
        updatedStatus: status.toLowerCase(),
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
    console.log('Error in changing job status', error)
    return error
  }
}

export { changeStatus }
