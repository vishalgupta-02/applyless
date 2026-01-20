import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import database from './configs/db.js'
import userRouter from './routes/user.js'
import jobsRouter from './routes/jobs.js'

const app = express()

await database()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://chrono-rust.vercel.app'],
    credentials: true,
  }),
)

app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobsRouter)

export default app
