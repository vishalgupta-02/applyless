import mongoose from 'mongoose'

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      enum: ['Onsite', 'Remote', 'Hybrid'],
      default: 'Onsite',
    },
    description: {
      type: String,
      default: '',
    },
    jobUrl: {
      type: String,
      default: '',
    },
    salary: {
      type: String,
      default: '',
    },
    currentStatus: {
      type: String,
      enum: [
        'Wishlist',
        'Applied',
        'Screening',
        'Interview',
        'Offer',
        'Rejected',
        'Ghosted',
      ],
      default: 'Wishlist',
    },
    timeline: [
      {
        status: {
          type: String,
          default: 'Wishlist',
        },
        date: {
          type: String,
          default: Date.now(),
        },
      },
    ],
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const jobApplicationModel = mongoose.model('JobApp', jobApplicationSchema)

export default jobApplicationModel
