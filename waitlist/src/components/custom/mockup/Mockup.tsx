const Mockup = () => {
  return (
    <>
      <div className='relative w-full max-w-5xl aspect-video bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-700 ring-1 ring-white/10'>
        <div className='bg-[#2a2a2a] px-4 py-3 flex items-center space-x-4 border-b border-gray-700 z-50 relative'>
          <div className='flex space-x-2'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <div className='flex-1 bg-[#1e1e1e] rounded-md py-1 px-3 text-center text-xs text-gray-500 font-medium flex items-center justify-center'>
            <span className='opacity-50'>applyless.me/dashboard</span>
          </div>
        </div>

        <div className='flex h-full filter blur-[6px] opacity-60 pointer-events-none select-none'>
          <div className='w-64 bg-[#252525] border-r border-gray-800 p-6 flex flex-col gap-6'>
            <div className='h-8 w-24 bg-gray-700 rounded mb-4'></div>
            <div className='space-y-3'>
              <div className='h-4 w-full bg-gray-700/50 rounded'></div>
              <div className='h-4 w-3/4 bg-gray-700/50 rounded'></div>
              <div className='h-4 w-5/6 bg-gray-700/50 rounded'></div>
            </div>
            <div className='mt-auto h-12 w-full bg-gray-700/30 rounded'></div>
          </div>

          <div className='flex-1 p-8'>
            <div className='flex justify-between items-center mb-8'>
              <div className='h-8 w-48 bg-gray-700 rounded'></div>
              <div className='h-8 w-8 bg-gray-700 rounded-full'></div>
            </div>
            <div className='w-full h-64 bg-gray-800/50 rounded-lg border border-gray-700'></div>
          </div>
        </div>

        <div className='absolute inset-0 top-12.5 flex items-center justify-center z-40'>
          <div className='grid grid-cols-3 gap-6 w-full max-w-3xl px-8'>
            <div className='bg-[#111] border border-gray-700/50 rounded-xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center text-center h-48 ring-1 ring-white/5'>
              <h3 className='text-gray-400 text-sm uppercase tracking-widest font-semibold mb-2'>
                Applications
              </h3>
              <span className='text-6xl font-bold text-white tracking-tighter'>
                0
              </span>
            </div>

            <div className='bg-[#111] border border-gray-700/50 rounded-xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center text-center h-48 ring-1 ring-white/5'>
              <h3 className='text-gray-400 text-sm uppercase tracking-widest font-semibold mb-2'>
                Interviews
              </h3>
              <span className='text-6xl font-bold text-white tracking-tighter'>
                0
              </span>
            </div>

            <div className='bg-[#111] border border-gray-700/50 rounded-xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center text-center h-48 ring-1 ring-white/5'>
              <h3 className='text-gray-400 text-sm uppercase tracking-widest font-semibold mb-2'>
                Follow-ups
              </h3>
              <span className='text-6xl font-bold text-white tracking-tighter'>
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mockup
