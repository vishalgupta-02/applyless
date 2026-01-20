import express from 'express'
import {
  changeJob,
  changeJobStatus,
  createJob,
  deleteJob,
  fetchSingleJob,
  getAllJobs,
} from '../controllers/jobs.js'
import { verifyToken } from '../middlewares/verify.js'

const jobsRouter = express.Router()

jobsRouter.get('/jobs', verifyToken, getAllJobs)
jobsRouter.post('/create-job', verifyToken, createJob)
jobsRouter.put('/change/:jobId', verifyToken, changeJob)
jobsRouter.delete('/delete/:id', verifyToken, deleteJob)
jobsRouter.patch('/:id/status', verifyToken, changeJobStatus)
jobsRouter.get('/:id', verifyToken, fetchSingleJob)

export default jobsRouter
