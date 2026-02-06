import SubsModel from '../models/subscription.js'
import emailConfirmation from '../utils/email-confirm.js'

const subsController = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ success: false, message: 'Bad Request' })
    }

    // Check if email already exists
    const existingEmail = await SubsModel.findOne({ email })
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed',
      })
    }

    // Get current subscriber count
    const currentCount = await SubsModel.countDocuments()
    const newCount = currentCount + 1

    const userEmail = await SubsModel.create({
      email,
      countSubs: newCount,
      confirmationSent: true,
    })
    const sendEmailConfirmation = await emailConfirmation(userEmail._id)

    if (!userEmail) {
      return res
        .status(500)
        .json({ success: false, message: 'Error while saving in DB' })
    }

    if (!sendEmailConfirmation) {
      return res
        .status(500)
        .json({ success: false, message: 'Error while sending confirmation' })
    }
    // console.log('User email: ', userEmail)
    // console.log('User email: ', userEmail.email)

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed',
      countSubs: newCount,
    })
  } catch (error) {
    console.log('Error occurred in Subs Controller: ', error)
    res
      .status(500)
      .json({ success: false, message: 'Error while subscribing, try again!' })
  }
}

export { subsController }
