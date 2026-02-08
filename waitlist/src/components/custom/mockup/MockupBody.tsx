import { Button } from '@/components/ui/button'
import { LockIcon } from 'lucide-react'
import type React from 'react'

const MockupBody = () => {
  return (
    <div className='w-full flex-1 bg-gray-50 flex justify-center items-start py-6 md:py-12 px-4'>
      <div className='w-full max-w-7xl'>
        {/* Header */}
        <div className='text-center mb-6 md:mb-8'>
          <h1 className='text-xl md:text-2xl font-semibold text-gray-900'>
            Hang tight. Your job tracker is coming together!
          </h1>
          <p className='text-xs md:text-sm text-gray-500 mt-2'>
            Your job search lives here. We're setting up your workspace.
          </p>
        </div>

        {/* Main Card */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 flex flex-col lg:flex-row gap-4 md:gap-6'>
          {/* Left Section */}
          <div className='flex-1 min-w-0'>
            {/* Tabs */}
            <div className='flex gap-4 md:gap-6 border-b border-gray-200 pb-3 md:pb-4 mb-4 md:mb-6 overflow-x-auto'>
              <Tab label='Applications' />
              <Tab label='Interviews' />
              <Tab label='Follow-ups' />
            </div>

            {/* Empty States */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6'>
              <EmptyCard />
              <EmptyCard />
              <EmptyCard />
            </div>

            {/* Helper Text */}
            <p className='text-sm md:text-base text-gray-500 mb-4 mt-8 md:mt-12 text-center'>
              Most job searches fall apart because applications, follow-ups, and
              notes end up scattered.
            </p>

            {/* Role Input */}
            <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-8 md:mt-12 mb-2 justify-center'>
              <span className='text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap'>
                Tell us one thing:
              </span>

              <div className='flex items-center border border-gray-300 rounded-lg px-3 md:px-4 py-2 w-full sm:w-64 justify-between text-sm'>
                <span className='text-gray-900'>Frontend Developer</span>
                <span className='text-green-600 font-semibold'>✓</span>
              </div>
            </div>

            <p className='text-xs text-gray-400 mt-2 text-center'>
              Saved. We’ll preload this when access opens.
            </p>
          </div>

          {/* Right Sidebar */}
          <div className='w-full lg:w-64 flex flex-col gap-3 md:gap-4'>
            {/* Today */}
            <SidebarCard title='Today'>
              <p className='text-sm text-gray-500'>No follow-ups yet</p>
            </SidebarCard>

            {/* Quick Stats */}
            <SidebarCard title='Quick Stats'>
              <Stat label='Applications' value='0' />
              <Stat label='Interviews' value='0' />
              <Stat label='Offers' value='0' />
            </SidebarCard>

            {/* Primary Role */}
            <SidebarCard title='Primary Role'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-700'>
                  Frontend Developer
                </span>
                <span className='text-green-600 font-semibold'>✓</span>
              </div>
            </SidebarCard>
          </div>
        </div>

        {/* Footer */}
        <p className='text-center text-xs md:text-sm text-gray-400 mt-4 md:mt-6'>
          This space is reserved for you. Come back here when you get access.
        </p>
      </div>
    </div>
  )
}

export default MockupBody

function Tab({ label }: { label: string }) {
  return (
    <div className='flex items-center gap-2 text-gray-700 font-medium'>
      <span>{label}</span>
    </div>
  )
}

function EmptyCard() {
  return (
    <div className='border-2 border-dashed flex flex-col justify-center items-center gap-6 border-gray-200 rounded-lg p-4 text-center'>
      <p className='text-sm text-gray-500 mb-4'>No applications yet</p>
      <p className='w-full flex justify-center'>
        <LockIcon className='w-9 h-9' />
      </p>
      <Button
        disabled
        className='w-full py-2 border border-gray-300 rounded-lg text-gray-400 text-sm cursor-not-allowed'>
        <span>
          <LockIcon className='w-3 h-3' />
        </span>
        Add application
      </Button>
    </div>
  )
}

function SidebarCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className='border border-gray-200 rounded-lg p-4 bg-white'>
      <h3 className='text-sm font-semibold text-gray-800 mb-3'>{title}</h3>
      {children}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between text-sm text-gray-600 mb-2'>
      <span>{label}</span>
      <span className='font-medium text-gray-900'>{value}</span>
    </div>
  )
}
