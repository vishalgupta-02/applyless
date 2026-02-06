import express from 'express'
import cors from 'cors'
import database from './configs/db.js'
import userRouter from './routes/user.js'
import jobsRouter from './routes/jobs.js'
import subsRouter from './routes/subs.js'

const app = express()

await database()

console.log('ENV LOADED:', !!process.env.RESEND_API_KEY)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://chrono-rust.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
)

app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobsRouter)
app.use('/api/v1/subscription', subsRouter)

export default app
