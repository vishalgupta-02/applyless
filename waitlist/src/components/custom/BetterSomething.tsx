import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import CongratsCard from './CongratsCard'
import MockupBody from './mockup/MockupBody'
import MockupNavbar from './mockup/MockupNavbar'
import { useMainContext } from '@/context/MainContext'
import { CrowdCanvas } from '../ui/crowd-canvas'
import { useEffect } from 'react'

const BetterSomething = () => {
  const { subscribed } = useMainContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!subscribed) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [subscribed, navigate])

  if (subscribed) {
    return (
      <div className='w-full h-full flex flex-col items-center gap-2 overflow-y-auto'>
        <CongratsCard />
        <MockupNavbar />
        <MockupBody />
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

export default BetterSomething
