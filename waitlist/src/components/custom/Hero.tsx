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

const SubscriptionSchema = z
  .object({
    email: z.email('Email is required'),
  })
  .required()

const Hero = () => {
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
        toast.success('Email subscribed successfully')
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
      <div className='font-mono flex justify-start items-center flex-col gap-5 w-full h-full backdrop-blur-sm px-4 py-2'>
        <div className='w-full max-w-fit font-bold text-center'>
          <span className='mr-2'>Built as a</span>
          <AuroraText>learning-first product.</AuroraText>
        </div>
        <div className='flex justify-center items-center rounded-sm'>
          <h1 className='md:text-3xl text-2xl uppercase text-zinc-900 font-semibold tracking-tight font-serif'>
            Chrono
          </h1>
        </div>
        <div>
          <Badge
            variant='outline'
            className='uppercase lg:text-sm text-[12px] font-bold text-gray-600'>
            <span className='inline-block w-2.5 h-2.5 bg-black rounded-full mr-2 animate-pulse shadow-lg shadow-black/35 transition-all duration-500'></span>
            Preview
          </Badge>
        </div>
        <div className='text-center space-y-2 md:space-y-4'>
          <h1 className='font-serif lg:text-6xl md:text-5xl text-3xl max-w-3xl'>
            Job hunting, minus the spreadsheet chaos
          </h1>
          <p className='w-full lg:max-w-2xl md:max-w-xl max-w-lg md:text-sm text-xs'>
            Track applications, interviews, and follow-ups in one place
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='flex justify-center items-center md:flex-row flex-col gap-1 w-full'>
            <Input
              type='text'
              {...register('email')}
              placeholder='Enter your email address'
              alt='Email-notifications'
              className='w-full max-w-md border border-gray-800 focus-visible:ring-0 focus-visible:border-0 px-4 py-2'
            />
            <p className='text-xs text-red-600'>{errors.email?.message}</p>
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
          <p className='text-md lg:text-xl tracking-tight md:text-black text-zinc-300'>
            No spam. Early access when ready.
          </p>
        </div>
        <div>
          <Countdown />
        </div>
      </div>
    </div>
  )
}

export default Hero
