import './App.css'
import { useCalculatorStore } from './lib/useCalculatorStore'
import Welcome from './components/Welcome'
import { HowItWorks } from './components/HowItWorks'
import StepOne from './components/StepOne'
function App() {
  const currentStep = useCalculatorStore((state) => state.currentStep);
  return (
    <>
      <div className='container'>
        {currentStep === 0 && <Welcome />}
        {currentStep === 1 && <HowItWorks />}
        {currentStep === 2 && <StepOne />}
      </div>

    </>
  )
}

export default App
