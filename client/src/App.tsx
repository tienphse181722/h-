import { useState } from 'react'
import TopicInput from './components/TopicInput'
import Stage1Sensory from './components/Stage1Sensory'
import Stage2Rational from './components/Stage2Rational'
import Stage3Practice from './components/Stage3Practice'
import Stage4Verification from './components/Stage4Verification'

function App() {
  const [started, setStarted] = useState(false)
  const [approach, setApproach] = useState<string>('observe')
  const [objects, setObjects] = useState<any[]>([])
  const [selectedObject, setSelectedObject] = useState<any>(null)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([])
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [currentStage, setCurrentStage] = useState(1)

  const handleStart = (selectedApproach: string, randomObjects: any[]) => {
    setApproach(selectedApproach)
    setObjects(randomObjects)
    setStarted(true)
    setCurrentStage(1)
  }

  const handleObjectSelected = (obj: any) => {
    setSelectedObject(obj)
    setCurrentStage(2)
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    }, 800)
  }

  const handleCharacteristicsSelected = (chars: string[]) => {
    setSelectedCharacteristics(chars)
    setCurrentStage(3)
  }

  const handleActionSelected = (action: string, isCorrect: boolean) => {
    if (isCorrect) {
      setSelectedAction(action)
      setCurrentStage(4)
    }
  }

  if (!started || objects.length === 0) {
    return <TopicInput onStart={handleStart} />
  }

  // Convert object to format for Stage3
  const gameData = selectedObject ? {
    ...selectedObject,
    actions: [
      { text: selectedObject.verificationAction.correct, correct: true },
      ...selectedObject.verificationAction.incorrect.map((action: string) => ({
        text: action,
        correct: false
      }))
    ]
  } : null

  return (
    <div className="relative">
      {/* Stage 1: Choose from 5 objects */}
      {currentStage >= 1 && (
        <Stage1Sensory objects={objects} onObjectSelected={handleObjectSelected} />
      )}
      
      {/* Stage 2: Collect characteristics */}
      {selectedObject && currentStage >= 2 && (
        <Stage2Rational 
          object={selectedObject}
          approach={approach}
          onCharacteristicsSelected={handleCharacteristicsSelected}
        />
      )}
      
      {/* Stage 3: Verify through practice */}
      {selectedCharacteristics.length > 0 && selectedObject && gameData && currentStage >= 3 && (
        <Stage3Practice 
          scenario={gameData}
          onActionSelected={handleActionSelected}
        />
      )}
      
      {/* Stage 4: Guess and conclude */}
      {selectedAction && selectedObject && currentStage >= 4 && (
        <Stage4Verification 
          scenario={selectedObject}
          selectedCharacteristics={selectedCharacteristics}
          selectedAction={selectedAction}
        />
      )}
    </div>
  )
}

export default App
