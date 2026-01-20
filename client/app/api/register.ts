import axios from 'axios'

const registerUser = async ({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/register`,
      {
        email,
        password,
        name,
      },
    )

    const data = response

    return data
  } catch (error) {
    console.error('Error in register api call')
    return error
  }
}

export { registerUser }
