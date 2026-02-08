import express from 'express'
import { subsController, userFeedback } from '../controllers/subs.js'

const subsRouter = express.Router()

subsRouter.post('/waitlist', subsController)
subsRouter.post('/feedback', userFeedback)

export default subsRouter
