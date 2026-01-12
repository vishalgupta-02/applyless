import userModel from '../models/user.js'
import { creatingHash, decodingHash } from '../utils/hashing.js'
import { generateToken } from '../lib/generate.js'

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body

    if (!email || !name || !password) {
      return res
        .status(401)
        .json({ success: false, message: 'All fields are required' })
    }

    const hashedPassword = await creatingHash(password)

    if (!hashedPassword) {
      return res
        .status(500)
        .json({ success: false, message: 'Something went wrong' })
    }

    const user = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = await userModel.create(user)

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: error || 'Error while saving newUser into DB',
      })
    }

    const registerToken = await generateToken(newUser._id)

    if (!registerToken) {
      return res
        .status(500)
        .json({ success: false, message: 'Something went wrong/34' })
    }

    res.status(200).json({
      success: true,
      message: 'Register Successful',
      token: registerToken,
    })
  } catch (error) {
    console.log('Error while register', error)
    return res.status(400).json({
      success: false,
      message: error.message || 'Register Failed',
      token: '',
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: 'All fields are required' })
    }

    const user = await userModel.findOne({ email })
    console.log('Id is', user)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const verifiedUser = await decodingHash({
      password,
      userPassword: user.password,
    }) // Always check the way you are sending the data
    if (!verifiedUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Credentials' })
    }

    const loginToken = await generateToken(user._id)
    console.log('Login Token', loginToken)
    if (!loginToken) {
      return res
        .status(500)
        .json({ success: false, message: 'Something went wrong' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Login Successful', token: loginToken })
  } catch (error) {
    console.log('Error while login', error)
    return res
      .status(400)
      .json({ success: false, message: 'Login Failed', token: '' })
  }
}

export { registerUser, loginUser }
