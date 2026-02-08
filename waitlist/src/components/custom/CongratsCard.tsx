import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const CongratsCard = () => {
  const navigate = useNavigate()

  return (
    <div className='w-full bg-black text-white px-4 md:px-6'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
        <h1 className='text-xs md:text-sm tracking-wide text-center'>
          Thanks for subscribing. Feel free to provide your valuable suggestions
          and feedbacks.
        </h1>
        <Button
          variant='link'
          className='text-xs md:text-sm cursor-pointer text-white whitespace-nowrap'
          onClick={() => navigate('/feedback')}>
          Click Here
        </Button>
      </div>
    </div>
  )
}

export default CongratsCard
