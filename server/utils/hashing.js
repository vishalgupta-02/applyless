import bcrypt from 'bcrypt'

const creatingHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    return hashed
  } catch (error) {
    console.log('Error while hashing the password')
    return null // Faced Problem
  }
}

const decodingHash = async ({ password, userPassword }) => {
  try {
    const decoded = await bcrypt.compare(password, userPassword)

    if (!decoded) {
      return 'Not Decoded'
    }
    return decoded
  } catch (error) {
    console.log('Error while decoding the password')
    return false //Faced problem
  }
}

export { creatingHash, decodingHash }
