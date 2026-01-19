import { useState } from 'react'
import TopicInput from './components/TopicInput'
import Stage1Sensory from './components/Stage1Sensory'
import Stage2Rational from './components/Stage2Rational'
import Stage3Practice from './components/Stage3Practice'
import Stage4Verification from './components/Stage4Verification'
import QRCodePage from './components/QRCodePage'

function App() {
  const [started, setStarted] = useState(false)
  const [approach, setApproach] = useState<string>('observe')
  const [objects, setObjects] = useState<any[]>([])
  const [selectedObject, setSelectedObject] = useState<any>(null)
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([])
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [currentStage, setCurrentStage] = useState(1)
  const [showQRCode, setShowQRCode] = useState(false)

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
    return (
      <>
        {/* QR Code Button */}
        <button
          onClick={() => setShowQRCode(true)}
          className="fixed top-4 right-4 z-40 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center gap-2"
        >
          <span className="text-xl">📱</span>
          <span className="hidden sm:inline">QR Code</span>
        </button>

        {/* QR Code Modal */}
        {showQRCode && <QRCodePage onClose={() => setShowQRCode(false)} />}

        <TopicInput onStart={handleStart} />
      </>
    )
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
      {/* QR Code Button - Fixed top right */}
      <button
        onClick={() => setShowQRCode(true)}
        className="fixed top-4 right-4 z-40 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center gap-2"
      >
        <span className="text-xl">📱</span>
        <span className="hidden sm:inline">QR Code</span>
      </button>

      {/* QR Code Modal */}
      {showQRCode && <QRCodePage onClose={() => setShowQRCode(false)} />}

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
