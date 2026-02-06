import Hero from './components/custom/Hero'
import { CrowdCanvas } from './components/ui/crowd-canvas'

const App = () => {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <div className='absolute inset-0 z-50 w-full'>
        <Hero />
      </div>
      <CrowdCanvas src='/all-peeps.png' rows={7} cols={15} />
    </div>
  )
}

export default App
