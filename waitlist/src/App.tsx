import { Route, Routes } from 'react-router-dom'
import BetterSomething from './components/custom/BetterSomething'
import LandingPage from './components/custom/Hero'
import FeedbackWrapper from './components/custom/FeedbackForm'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/better' element={<BetterSomething />} />
      <Route path='/feedback' element={<FeedbackWrapper />} />
    </Routes>
  )
}

export default App
