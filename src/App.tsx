import './App.css'
import { useCalculatorStore } from './lib/useCalculatorStore'
import Welcome from './components/Welcome'
import { HowItWorks } from './components/HowItWorks'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'
import StepFive from './components/StepFive'
import StepSix from './components/StepSix'
import StepSeven from './components/StepSeven'
import StepEight from './components/StepEight'
import { ColocacionScreen } from './components/ColocacionScreen'
import { RecuperacionScreen } from './components/RecuperacionScreen'
import { Resultados } from './components/Resultados'
function App() {
  const currentStep = useCalculatorStore((state) => state.currentStep);
  return (
    <>
      <div className='container'>
        {currentStep === 0 && <Welcome />}
        {/*currentStep === 1 && <HowItWorks />*/}
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />}
        {currentStep === 4 && <StepFour />}
        {currentStep === 5 && <StepFive />}
        {currentStep === 6 && <StepSix />}
        {currentStep === 7 && <StepSeven />}
        {currentStep === 8 && <StepEight />}
        {currentStep === 9 && <Resultados />}
        {/*currentStep === 9 && <ColocacionScreen />}
        {/*currentStep === 10 && <RecuperacionScreen />}*/}


      </div>

    </>
  )
}

export default App
