import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    typeOfFeed: {
      type: String,
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

const FeedbackModel = mongoose.model('feedback', feedbackSchema)

export default FeedbackModel
