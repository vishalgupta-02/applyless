import z from 'zod'

const SubscriptionSchema = {
  id: z.string().optional(),
  email: z.email('Email is required'),
  createdAt: z.string(),
}

export { SubscriptionSchema }
