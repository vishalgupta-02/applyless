import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const CongratsCard = () => {
  const navigate = useNavigate()

  return (
    <div className='w-full h-8 bg-black text-white'>
      <div className='flex justify-center items-center gap-2'>
        <h1 className='text-sm tracking-wide'>
          Thanks for subscribing. Feel free to provide your valuable suggestions
          and feedbacks.
        </h1>
        <Button
          variant='link'
          className='text-sm cursor-pointer text-white'
          onClick={() => navigate('/feedback')}>
          Click Here
        </Button>
      </div>
    </div>
  )
}

export default CongratsCard
