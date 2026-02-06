import express from 'express'
import { subsController } from '../controllers/subs.js'

const subsRouter = express.Router()

subsRouter.post('/waitlist', subsController)

export default subsRouter
