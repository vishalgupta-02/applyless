import FeedbackModel from '../models/feedback.js'
import SubsModel from '../models/subscription.js'
// import emailConfirmation from '../utils/email-confirm.js'

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
    // const sendEmailConfirmation = await emailConfirmation(userEmail._id)

    if (!userEmail) {
      return res
        .status(500)
        .json({ success: false, message: 'Error while saving in DB' })
    }

    return res
      .status(200)
      .json({ success: true, message: 'Thanks for subscribing' })

    // -------------------- Email Confirmation Logic (Resend & Twilio[add later]) --------------------

    // console.log('Email error', sendEmailConfirmation)

    // if (sendEmailConfirmation) {
    //   return res
    //     .status(200)
    //     .json({ success: true, message: 'Confirmation Email Sent' })
    // } else {
    //   return res
    //     .status(500)
    //     .json({ success: false, message: 'Error while sending confirmation!' })
    // }
  } catch (error) {
    console.log('Error occurred in Subs Controller: ', error)
    return res
      .status(500)
      .json({ success: false, message: 'Error while subscribing, try again!' })
  }
}

const userFeedback = async (req, res) => {
  try {
    const { type, message, email } = req.body

    if (!type || !message) {
      return res
        .status(400)
        .json({ status: false, message: 'All fields are required' })
    }

    const saveToDB = {
      typeOfFeed: type,
      messageContent: message,
      email: email || '',
    }

    const userAdvice = await FeedbackModel.create(saveToDB)

    await userAdvice.save()

    return res.status(201).json({
      success: true,
      message: 'Thanks! Will reply soon, if valid email provided',
    })
  } catch (error) {
    console.log('Error occurred in feedbackSave Controller: ', error)
    res
      .status(500)
      .json({ success: false, message: 'Error while saving, try again!' })
  }
}

export { subsController, userFeedback }
