import './App.css'
import { useCalculatorStore } from './lib/useCalculatorStore'
import Welcome from './components/Welcome'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'
import StepFive from './components/StepFive'
import StepSix from './components/StepSix'
import StepSeven from './components/StepSeven'
import StepEight from './components/StepEight'
import LeadForm from './components/LeadForm'
import { Resultados } from './components/Resultados'
import Footer from './components/Footer'

function App() {
  const currentStep = useCalculatorStore((state) => state.currentStep);
  return (
    <>
      <div className='container'>
        {currentStep === 0 && <Welcome />}
        {currentStep === 1 && <LeadForm />}
        {currentStep === 2 && <StepOne />}
        {currentStep === 3 && <StepTwo />}
        {currentStep === 4 && <StepThree />}
        {currentStep === 5 && <StepFour />}
        {currentStep === 6 && <StepFive />}
        {currentStep === 7 && <StepSix />}
        {currentStep === 8 && <StepSeven />}
        {currentStep === 9 && <StepEight />}
        {currentStep === 10 && <Resultados />}
        {(currentStep === 0 || currentStep === 1 || currentStep === 10) && <Footer />}
      </div>

    </>
  )
}

export default App
