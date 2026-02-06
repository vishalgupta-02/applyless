import mongoose from 'mongoose'

const subsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    countSubs: {
      type: String,
    },
    confirmationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const SubsModel = mongoose.model('waitlist', subsSchema)

export default SubsModel
