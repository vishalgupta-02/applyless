import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { AvatarCircles } from '@/components/ui/avatar-circles'
import Countdown from './Countdown'
import { AuroraText } from '@/components/ui/aurora-text'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { toast } from 'sonner'
import { CrowdCanvas } from '../ui/crowd-canvas'
import { useNavigate } from 'react-router-dom'
import { useMainContext } from '@/context/MainContext'

const SubscriptionSchema = z
  .object({
    email: z.email('Please enter valid email'),
  })
  .required()

const Hero = () => {
  const navigate = useNavigate()

  const { setSubscribed } = useMainContext()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SubscriptionSchema),
  })

  interface SubscriptionFormData {
    email: string
  }

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/subscription/waitlist`,
        {
          email: JSON.stringify(data),
        },
      )
      console.log('Req from back: ', response)
      if (response?.data.success) {
        setSubscribed(true)
        toast.success(response?.data.message || 'Email subscribed successfully')
        navigate('/better')
      } else {
        console.log('Got some error while making requests')
        toast.error('Got some error while making requests')
      }
      reset()
    } catch (error) {
      console.log('Error while subscribing', error)
    }
  }

  return (
    <div className='flex justify-center items-center w-full md:h-screen h-full pt-4'>
      <div className='font-mono flex justify-start items-center flex-col gap-5 w-full h-full px-4 py-2'>
        <div className='w-full max-w-fit font-bold text-center text-sm'>
          <span className='mr-2'>Built end-to-end by Vishal Gupta ·</span>
          <AuroraText>Design → Code → Production</AuroraText>
        </div>
        <div className='flex justify-center items-center rounded-sm'>
          <h1 className='md:text-3xl text-lg uppercase text-zinc-900 font-semibold tracking-wide font-serif'>
            Applyless
          </h1>
        </div>
        <div>
          <Badge
            variant='outline'
            className='uppercase lg:text-sm text-[12px] font-bold text-gray-600'>
            <span className='inline-block w-2.5 h-2.5 bg-black rounded-full mr-2 animate-pulse shadow-lg shadow-black/35 transition-all duration-500'></span>
            In Progress
          </Badge>
        </div>
        <div className='w-full flex flex-col justify-center items-center space-y-2 md:space-y-4'>
          <h1 className='font-serif md:text-5xl text-xl max-w-3xl text-center'>
            Because job hunting is already hard enough
          </h1>
          <p className='w-full md:max-w-3xl max-w-lg sm:text-sm text-xs text-center'>
            A lightweight way to track applications and follow-ups without
            juggling tabs or notes.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='flex md:items-start justify-center items-center md:flex-row flex-col gap-4 w-full'>
            <div className='w-full max-w-lg flex flex-col justify-center items-center gap-2'>
              <Input
                type='text'
                {...register('email')}
                placeholder='Enter your email address'
                alt='Email-notifications'
                className='w-full max-w-lg border border-gray-800 focus-visible:ring-0 focus-visible:border-0 px-4 py-2'
              />
              <p className='text-xs text-red-600'>{errors.email?.message}</p>
            </div>
            <Button className='cursor-pointer'>Join waitlist</Button>
          </div>
        </form>
        <div className='flex justify-center items-center gap-4 flex-col md:flex-row'>
          <AvatarCircles
            numPeople={+99}
            avatarUrls={[
              {
                imageUrl: 'https://avatars.githubusercontent.com/u/101015515',
                profileUrl: 'https://github.com/vishalgupta-02',
              },
              {
                imageUrl: 'https://avatars.githubusercontent.com/u/106103625',
                profileUrl: 'https://github.com/BankkRoll',
              },
              {
                imageUrl: 'https://avatars.githubusercontent.com/u/59228569',
                profileUrl: 'https://github.com/safethecode',
              },
              {
                imageUrl: 'https://avatars.githubusercontent.com/u/59442788',
                profileUrl: 'https://github.com/sanjay-mali',
              },
            ]}
          />
          <p className='text-md lg:text-xl text-center tracking-tight md:text-black text-zinc-300 font-bold'>
            <AuroraText>Early access when it's ready. No spam.</AuroraText>
          </p>
        </div>
        <div>
          <Countdown />
        </div>
      </div>
    </div>
  )
}

const LandingPage = () => {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <div className='absolute inset-0 z-50 w-full'>
        <Hero />
      </div>
      <CrowdCanvas src='/all-peeps.png' rows={7} cols={15} />
    </div>
  )
}

export default LandingPage
