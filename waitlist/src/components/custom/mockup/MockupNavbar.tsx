import { LockKeyholeIcon } from 'lucide-react'

const MockupNavbar = () => {
  return (
    <div className='w-full'>
      <div className='px-4 md:px-6 lg:px-24 py-2 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4'>
        <h1 className='uppercase text-lg md:text-xl font-serif font-bold tracking-wide'>
          Applyless
        </h1>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4'>
          <p className='text-xs md:text-sm'>user@example.com</p>
          <div className='flex justify-center items-center gap-2 border bg-zinc-900 px-3 py-1.5 rounded-xl'>
            <LockKeyholeIcon className='w-3 h-3 text-white' />
            <p className='text-xs text-white'>Early Access Locked</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MockupNavbar
