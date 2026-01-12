import axios from 'axios'

const loginUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    console.log('Backend Url: ', process.env.NEXT_PUBLIC_BACKEND_URL)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`,
      {
        email,
        password,
      }
    )

    const data = response.data

    return data
  } catch (error) {
    console.error('Error in login api call')
    return error
  }
}

export { loginUser }
