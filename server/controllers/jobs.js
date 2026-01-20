import jobApplicationModel from '../models/jobApplication.js'
import userModel from '../models/user.js'

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      jobUrl,
      salary,
      currentStatus,
      notes,
    } = req.body

    if (!title || !company) {
      return res
        .status(400)
        .json({ success: false, message: 'Title and Company are required' })
    }

    const token = req.user
    console.log(token)

    const user = await userModel.findById(token.id)
    console.log('User in jobs Controller', user)
    if (!user) {
      return res.status(400).json({ success: false, message: 'No User Found' })
    }

    const newJob = {
      title,
      company,
      description: description || '',
      location: location || 'Onsite',
      jobUrl: jobUrl || '',
      salary: salary || '',
      currentStatus: currentStatus || 'Wishlist',
      notes: notes || '',
      user: user._id,
      timeline: [
        {
          status: currentStatus || 'Wishlist',
          date: new Date().toISOString(),
        },
      ],
    }

    const newJobCreated = await jobApplicationModel.create(newJob)
    if (!newJobCreated) {
      return res
        .status(500)
        .json({ success: false, message: 'Error while saving the job' })
    }

    res.status(201).json({
      success: true,
      message: 'New Job Created Successfully',
      newJobCreated,
    })
  } catch (error) {
    console.log('Error while creating job')
    res.status(500).json({ success: false, message: 'Job Creation Failed' })
  }
}

const getAllJobs = async (req, res) => {
  try {
    const allJobs = await jobApplicationModel.find({})
    if (!allJobs) {
      return res
        .status(500)
        .json({ success: false, message: 'Error while fetching all jobs' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Jobs Fetched Successfully', allJobs })
  } catch (error) {
    console.log('Error while creating job')
    res.status(500).json({ success: false, message: 'Job Creation Failed' })
  }
}

const changeJob = async (req, res) => {
  try {
    const { user } = req

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: 'User Forbidden, Not Allowed' })
    }

    const { title, company, location, description, jobUrl, salary } = req.body

    const { jobId } = req.params
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: 'Job Id is required' })
    }

    if (!title || !company || !location || !description || !jobUrl || !salary) {
      return res.status(400).json({
        success: false,
        message: 'All Fields are required for updation',
      })
    }

    const changingJob = await jobApplicationModel.findById(jobId)
    if (!changingJob) {
      return res.status(500).json({ success: false, message: 'Job not found' })
    }

    const changedJob = {
      title,
      company,
      location,
      description,
      jobUrl,
      salary,
    }

    console.log('Changed in job', changedJob)

    const updatedJob = await jobApplicationModel.findByIdAndUpdate(
      jobId,
      changedJob,
      { new: true },
    )

    console.log('See the change in job updation', updatedJob)

    if (!updatedJob) {
      return res
        .status(500)
        .json({ success: false, message: 'Job updation failed' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Job Change Done', updatedJob })
  } catch (error) {
    console.log('Error while creating job')
    res.status(500).json({ success: false, message: 'Job Creation Failed' })
  }
}

const deleteJob = async (req, res) => {
  try {
    const { user } = req

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: 'Forbidden, User Not Allowed' })
    }

    const { id } = req.params
    if (!id) {
      return res.status(400).json({ success: false, message: 'Job not found' })
    }

    const deletedJob = await jobApplicationModel.findByIdAndDelete(id)

    if (!deletedJob) {
      return res
        .status(500)
        .json({ success: false, message: 'Job Deletion Failed' })
    }

    res.status(200).json({ success: true, message: 'Job Deletion Successful' })
  } catch (error) {
    console.log('Error while creating job')
    res.status(500).json({ success: false, message: 'Job Creation Failed' })
  }
}

const changeJobStatus = async (req, res) => {
  try {
    const { user } = req
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: 'Forbidden, User Not Allowed' })
    }

    const { updatedStatus } = req.body

    const { id } = req.params

    console.log('Current job with id', id)

    const currentInfo = await jobApplicationModel.findById(id)

    console.log('Current info of the job', currentInfo)

    if (!currentInfo) {
      return res
        .status(500)
        .json({ success: false, message: 'Current Job Info fetch failed' })
    }

    // Verify the job belongs to the current user
    if (currentInfo.user.toString() !== user.id) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized to update this job' })
    }

    const changesDone = {
      currentStatus: updatedStatus,
      $push: {
        timeline: {
          status: updatedStatus,
          date: new Date(Date.now()),
        },
      },
    }

    const changedInfo = await jobApplicationModel.findByIdAndUpdate(
      id,
      changesDone,
      { new: true },
    )

    if (!changedInfo) {
      return res
        .status(500)
        .json({ success: false, message: 'Changing Job failed' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Changing Job Status Done Successful' })
  } catch (error) {
    console.log('Error while changing job status')
    res
      .status(500)
      .json({ success: false, message: 'Job Status Changing Failed' })
  }
}

const fetchSingleJob = async (req, res) => {
  try {
    const { user } = req
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: 'Forbidden, User Not Allowed' })
    }

    const { id } = req.params

    const requestedJob = await jobApplicationModel.findById(id)
    // console.log(`Requested Job with id: ${id}`, requestedJob)
    if (!requestedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Job Found Successfully',
      requestedJob,
    })
  } catch (error) {
    console.log('Error while fetching individual job', error)
    res
      .status(500)
      .json({ success: false, message: 'Error fetching individual job' })
  }
}

export {
  getAllJobs,
  createJob,
  changeJob,
  deleteJob,
  changeJobStatus,
  fetchSingleJob,
}
