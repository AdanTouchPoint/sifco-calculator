import './App.css'
import Welcome from './components/Welcome'
import { HowItWorks } from './components/HowItWorks'
import StepOne from './components/StepOne'
function App() {
  return (
    <>
      <div className='container'>
        <Welcome />
        <HowItWorks />
        <StepOne />
      </div>

    </>
  )
}

export default App
