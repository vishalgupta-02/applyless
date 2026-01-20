import axios from 'axios'

const deleteJob = async ({ id, token }: { id: string; token: string }) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const data = response

    return data
  } catch (error) {
    console.log('Error in delete api call', error)
    return error
  }
}

export { deleteJob }
