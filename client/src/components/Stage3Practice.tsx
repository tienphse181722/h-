import { motion } from 'framer-motion'
import { useState } from 'react'

interface Scenario {
  context: string
  problem: string
  symptoms: Array<{ text: string; icon: string; isCorrect: boolean }>
  actions: Array<{ text: string; correct: boolean }>
}

interface Stage3Props {
  scenario: Scenario
  onActionSelected: (action: string, isCorrect: boolean) => void
}

export default function Stage3Practice({ scenario, onActionSelected }: Stage3Props) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [selectedActionCorrect, setSelectedActionCorrect] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleActionSelect = (action: string, isCorrect: boolean) => {
    setSelectedAction(action)
    setSelectedActionCorrect(isCorrect)
    
    // Show error if wrong action
    if (!isCorrect) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } else {
      setShowError(false)
    }
  }

  const handleProceed = () => {
    if (!selectedAction || !selectedActionCorrect) return
    
    onActionSelected(selectedAction, selectedActionCorrect)
    
    // Scroll to next stage
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight * 3,
        behavior: 'smooth'
      })
    }, 300)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center py-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)'
      }}
    >
      <div className="max-w-4xl w-full">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Lý tính
          </h2>
          <p className="text-lg text-gray-600">
            Chọn một hành động để kiểm chứng
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 relative"
        >
          {/* Error message */}
          {showError && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10"
            >
              <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl">
                <p className="font-bold">⚠️ Hành động này không đúng!</p>
              </div>
            </motion.div>
          )}

          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Bạn sẽ làm gì để kiểm chứng?
          </h3>
          
          <div className="space-y-4">
            {scenario.actions.map((action, idx) => {
              const isSelected = selectedAction === action.text
              const showWrong = isSelected && !action.correct && showError
              
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleActionSelect(action.text, action.correct)}
                  className={`w-full p-6 text-left rounded-xl border-2 transition-all ${
                    showWrong
                      ? 'border-red-500 bg-red-100 shadow-lg'
                      : isSelected
                      ? action.correct
                        ? 'border-green-500 bg-green-100 shadow-lg'
                        : 'border-orange-400 bg-orange-50 shadow-lg'
                      : 'border-gray-200 hover:border-orange-400 hover:bg-orange-50'
                  }`}
                  animate={showWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    {isSelected && (
                      <span className="text-2xl">
                        {action.correct ? '✓' : showError ? '❌' : ''}
                      </span>
                    )}
                    <p className="text-lg font-semibold text-gray-800 flex-1">{action.text}</p>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Error message */}
          {showError && !selectedActionCorrect && (
            <motion.div
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-600 font-medium text-center">
                Chưa đúng, thử lại xem
              </p>
            </motion.div>
          )}

          {/* Single button - changes based on state */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-full mt-8"
          >
            {selectedAction && selectedActionCorrect ? (
              <button
                onClick={handleProceed}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                Tiếp tục
              </button>
            ) : selectedAction && !selectedActionCorrect ? (
              <button
                disabled
                className="w-full px-8 py-4 bg-gray-200 text-gray-500 rounded-2xl text-lg font-semibold cursor-not-allowed"
              >
                Chọn lại xem
              </button>
            ) : (
              <button
                disabled
                className="w-full px-8 py-4 bg-gray-100 text-gray-400 rounded-2xl text-lg font-semibold cursor-not-allowed"
              >
                Chọn một hành động
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-orange-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}
