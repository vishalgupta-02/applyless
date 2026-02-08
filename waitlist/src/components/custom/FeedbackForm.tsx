import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useMainContext } from '@/context/MainContext'
import axios from 'axios'
import { CrowdCanvas } from '../ui/crowd-canvas'

const feedbackSchema = z.object({
  type: z
    .enum(['feedback', 'suggestion', 'advice'])
    .refine((val) => val !== undefined, { message: 'Select a type' }),
  message: z
    .string()
    .min(10, "Tell me a bit more. One-liners don't help.")
    .max(1000, "That's a lot. Trim it down a little."),
  email: z
    .string()
    .email("That doesn't look like a real email.")
    .optional()
    .or(z.literal('')),
})

interface FormErrorsType {
  type?: string
  message?: string
  email?: string
}

const FeedbackForm = () => {
  const [form, setForm] = useState({
    type: 'feedback',
    message: '',
    email: '',
  })

  const [errors, setErrors] = useState<FormErrorsType>({})

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})

    const result = feedbackSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors: FormErrorsType = {}
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof FormErrorsType] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/subscription/feedback`,
      result.data,
    )

    if (response?.data.success) {
      console.log('Resposne from feedback: ', response.data)
      toast.message('Thanks. This genuinely helps.')
    } else {
      console.log('Error from backend I think')
      toast.error(response?.data.message)
    }
    setForm({ type: 'feedback', message: '', email: '' })
  }

  return (
    <div className='w-full max-w-xl mx-auto bg-white border border-gray-200 rounded-xl p-4 md:p-6'>
      <h2 className='text-base md:text-lg font-semibold text-gray-900 mb-2'>
        Share feedback or a suggestion
      </h2>

      <p className='text-xs md:text-sm text-gray-600 mb-4'>
        I’m building this in the open. Early feedback shapes the product more
        than dashboards ever will. If something feels off, say it now while it’s
        still cheap to fix.
      </p>

      <p className='text-xs md:text-sm text-gray-600 mb-6'>
        Blunt is welcome. Silence is expensive.
      </p>

      <form onSubmit={handleSubmit} className='space-y-3 md:space-y-4'>
        {/* Type */}
        <div>
          <label className='block text-xs md:text-sm font-medium text-gray-700 mb-1'>
            What is this about?
          </label>
          <select
            name='type'
            value={form.type}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-xs md:text-sm'>
            <option value='feedback'>Feedback</option>
            <option value='suggestion'>Suggestion</option>
            <option value='advice'>Advice</option>
          </select>
          {errors.type && (
            <p className='text-xs text-red-600 mt-1'>{errors.type}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className='block text-xs md:text-sm font-medium text-gray-700 mb-1'>
            Your message
          </label>
          <textarea
            name='message'
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder='What should stay, change, or disappear?'
            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-xs md:text-sm resize-none'
          />
          {errors.message && (
            <p className='text-xs text-red-600 mt-1'>{errors.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className='block text-xs md:text-sm font-medium text-gray-700 mb-1'>
            Email (optional)
          </label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder='Only if you want a reply'
            className='w-full border border-gray-300 rounded-lg px-3 py-2 text-xs md:text-sm'
          />
          {errors.email && (
            <p className='text-xs text-red-600 mt-1'>{errors.email}</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full bg-gray-900 text-white rounded-lg py-2 text-xs md:text-sm font-medium hover:bg-gray-800 transition'>
          Send feedback
        </button>
      </form>

      <p className='text-xs text-gray-400 mt-3 md:mt-4'>
        No tracking. No newsletters. This goes straight into the build queue.
      </p>
    </div>
  )
}

const FeedbackWrapper = () => {
  const navigate = useNavigate()

  const { subscribed } = useMainContext()

  useEffect(() => {
    if (!subscribed) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [subscribed, navigate])

  if (subscribed) {
    return (
      <div className='relative w-full mx-auto h-screen flex justify-center items-center flex-col gap-4 overflow-y-auto'>
        <div className='absolute z-0 w-full h-full bg-linear-to-br from-gray-50 via-zinc-300 to-zinc-500' />

        <Button
          className='absolute z-99 top-3 md:top-4 left-3 md:left-4 px-3 md:px-4 py-2 text-xs md:text-sm cursor-pointer'
          onClick={() => navigate('/')}>
          Back
        </Button>

        <div className='space-y-2 absolute z-50 inset-0 flex flex-col items-center pt-6 md:pt-8 gap-1 px-4 py-6'>
          <h1 className='text-base md:text-2xl font-semibold font-serif text-center'>
            Hello, Thanks again for subscribing
          </h1>
          <p className='text-xs w-full max-w-xs sm:max-w-sm md:max-w-md text-center mb-4'>
            Always happy to learn about your valuable feedbacks and suggestions
            or any advice you might think can help me.
          </p>
          <FeedbackForm />
        </div>
      </div>
    )
  } else {
    return (
      <div className='w-full h-screen flex flex-col gap-2 justify-center items-center'>
        <div className='relative h-screen w-screen overflow-hidden'>
          <div className='absolute flex justify-starts items-center flex-col h-full top-4 gap-4 z-50 w-full'>
            <h1 className='text-lg font-semibold'>
              You are not subscribed. Fall back.
            </h1>
            <Button
              className='px-4 py-2 cursor-pointer'
              onClick={() => navigate('/')}>
              Move to Home
            </Button>
            <p className='text-7xl w-full max-w-5xl text-center mt-4 font-serif'>
              Don't be a part of this crowd, Subscribe now!
            </p>
          </div>
          <CrowdCanvas src='/all-peeps.png' rows={7} cols={15} />
        </div>
      </div>
    )
  }
}

export default FeedbackWrapper
