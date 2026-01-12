import axios from 'axios'

const fetchJob = async (token: string) => {
  try {
    console.log('Token from fetchJob', token.toString())
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job/jobs`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )

    const data = response.data

    return data
  } catch (error) {
    console.error('Error in login api call')
    return error
  }
}

export { fetchJob }
