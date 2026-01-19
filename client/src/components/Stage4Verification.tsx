import { motion } from 'framer-motion'
import { useState } from 'react'
import confetti from 'canvas-confetti'

interface Stage4Props {
  scenario: any
  selectedCharacteristics: string[]
  selectedAction: string
}

export default function Stage4Verification({ scenario, selectedCharacteristics, selectedAction }: Stage4Props) {
  const [userGuess, setUserGuess] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleGuessSelect = (option: string) => {
    setUserGuess(option)
    
    // Check if wrong answer
    if (option !== scenario.correctGuess) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    } else {
      setShowError(false)
    }
  }

  const handleSubmitGuess = () => {
    if (!userGuess.trim()) return
    
    // Only allow submit if correct answer
    if (userGuess !== scenario.correctGuess) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }
    
    setShowResult(true)
    
    // Bắn pháo hoa khi đúng!
    if (isGuessCorrect) {
      // Pháo hoa từ 2 bên - responsive cho mobile
      const duration = 3000
      const animationEnd = Date.now() + duration
      const isMobile = window.innerWidth < 640
      const defaults = { 
        startVelocity: isMobile ? 25 : 30, 
        spread: 360, 
        ticks: isMobile ? 50 : 60, 
        zIndex: 0 
      }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = (isMobile ? 30 : 50) * (timeLeft / duration)
        
        // Bắn từ bên trái
        confetti({
          ...defaults,
          particleCount,
          origin: { 
            x: randomInRange(isMobile ? 0.05 : 0.1, isMobile ? 0.25 : 0.3), 
            y: Math.random() - 0.2 
          }
        })
        
        // Bắn từ bên phải
        confetti({
          ...defaults,
          particleCount,
          origin: { 
            x: randomInRange(isMobile ? 0.75 : 0.7, isMobile ? 0.95 : 0.9), 
            y: Math.random() - 0.2 
          }
        })
      }, 250)
    }
  }

  const isGuessCorrect = userGuess === scenario.correctGuess

  if (showResult) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4"
        style={{
          background: isGuessCorrect 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
            : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }}
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            style={{ bottom: '10%', right: '10%' }}
          />
        </div>

        <div className="max-w-4xl w-full relative z-10">
          {isGuessCorrect ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-9xl mb-6 text-center"
              >
                🎉
              </motion.div>
              <h3 className="text-5xl font-bold mb-6 text-center text-white">
                Chính xác rồi!
              </h3>

              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/30">
                <p className="text-2xl text-white/90 mb-4">
                  Bạn đã đoán đúng:
                </p>
                <p className="text-4xl font-bold text-white mb-6">
                  {scenario.correctGuess}
                </p>
                
                <div className="border-t border-white/30 pt-6 mt-6">
                  <p className="text-xl text-white/80 mb-3">
                    Câu trả lời của bạn:
                  </p>
                  <p className="text-2xl text-white font-semibold">
                    "{userGuess}"
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 mb-6">
                <h4 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                  Chu trình nhận thức
                </h4>
                <div className="space-y-4 text-lg text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">👁️</span>
                    <div>
                      <strong>Thực tiễn:</strong> Bạn nhìn thấy một phần nhỏ
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <strong>Cảm tính:</strong> Bạn thu thập đặc điểm và suy luận
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔨</span>
                    <div>
                      <strong>Lý tính:</strong> Bạn kiểm chứng bằng hành động
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Thực tiễn kiểm chứng:</strong> Bạn đưa ra kết luận chính xác
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => window.location.reload()}
                className="w-full px-8 py-5 bg-white text-purple-600 rounded-full text-xl font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
              >
                🔄 Chơi lại với sự vật khác
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-9xl mb-6 text-center"
              >
                🤔
              </motion.div>
              <h3 className="text-5xl font-bold mb-6 text-center text-white">
                Chưa đúng lắm...
              </h3>

              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/30">
                <p className="text-2xl text-white/90 mb-4">
                  Bạn đã đoán:
                </p>
                <p className="text-3xl font-bold text-white mb-6">
                  "{userGuess}"
                </p>
                
                <div className="border-t border-white/30 pt-6 mt-6">
                  <p className="text-xl text-white/80 mb-3">
                    Đáp án đúng là:
                  </p>
                  <p className="text-4xl text-white font-bold">
                    {scenario.correctGuess}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 mb-6">
                <h4 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                  💭 Không sao, học hỏi là quá trình!
                </h4>
                <p className="text-lg text-gray-700 text-center mb-4">
                  Nhận thức không phải lúc nào cũng đúng ngay từ đầu. Quan trọng là bạn đã trải qua quá trình suy nghĩ và kiểm chứng.
                </p>
                <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-300">
                  <p className="text-center text-gray-800 font-semibold">
                    🔄 Thử lại để rèn luyện khả năng quan sát và suy luận nhé!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setShowResult(false)}
                  className="flex-1 px-8 py-5 bg-white text-orange-600 rounded-full text-xl font-bold hover:bg-gray-100 transition-all shadow-xl"
                >
                  ↩️ Thử lại
                </motion.button>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => window.location.reload()}
                  className="flex-1 px-8 py-5 bg-white text-purple-600 rounded-full text-xl font-bold hover:bg-gray-100 transition-all shadow-xl"
                >
                  🔄 Sự vật mới
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
      }}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ bottom: '10%', right: '10%' }}
        />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Thực tiễn kiểm chứng
          </h2>
          <p className="text-lg sm:text-xl text-white/90">
            Đưa ra kết luận của bạn
          </p>
        </motion.div>

        {/* Summary card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 mb-6 sm:mb-8 border border-white/20"
        >
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <span>📝</span> Những gì bạn đã biết:
          </h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {selectedCharacteristics.slice(0, 6).map((char, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30"
              >
                {char}
              </motion.div>
            ))}
            {selectedCharacteristics.length > 6 && (
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                +{selectedCharacteristics.length - 6} đặc điểm khác
              </div>
            )}
          </div>
          
          <div className="border-t border-white/30 pt-4 sm:pt-6">
            <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-3 flex items-center gap-2">
              <span>⚡</span> Bạn đã thử:
            </h3>
            <div className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium border border-white/30">
              {selectedAction}
            </div>
          </div>
        </motion.div>

        {/* Input section */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-10 border border-white/20 relative"
        >
          {/* Error message */}
          {showError && (
            <motion.div
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: -20 }}
              className="absolute -top-16 sm:-top-20 left-1/2 transform -translate-x-1/2 z-20 w-[90%] sm:w-auto"
            >
              <div className="bg-red-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl">❌</span>
                <div>
                  <p className="font-bold text-sm sm:text-lg">Chưa đúng rồi!</p>
                  <p className="text-xs sm:text-sm">Hãy thử lại nhé</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mb-6 sm:mb-8">
            <label className="block text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              Theo bạn, đây là gì?
            </label>
            <p className="text-white/80 text-center text-sm sm:text-base mb-4 sm:mb-6">
              Chọn một đáp án
            </p>
          </div>

          {/* Multiple choice options */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {[scenario.correctGuess, ...scenario.wrongGuesses]
              .sort(() => Math.random() - 0.5)
              .map((option, idx) => {
                const isSelected = userGuess === option
                const isCorrect = option === scenario.correctGuess
                const showWrong = isSelected && !isCorrect && showError
                
                return (
                  <motion.button
                    key={idx}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      scale: showWrong ? [1, 1.05, 0.95, 1] : 1
                    }}
                    transition={{ 
                      delay: 0.5 + idx * 0.1,
                      scale: { duration: 0.3 }
                    }}
                    onClick={() => handleGuessSelect(option)}
                    className={`w-full p-4 sm:p-5 text-left rounded-xl sm:rounded-2xl border-2 transition-all ${
                      showWrong
                        ? 'border-red-500 bg-red-500/30 shadow-2xl'
                        : isSelected
                        ? isCorrect
                          ? 'border-green-400 bg-green-400/30 shadow-2xl scale-105'
                          : 'border-white bg-white/30 shadow-2xl scale-105'
                        : 'border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                        showWrong
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                          ? isCorrect
                            ? 'border-green-400 bg-green-400'
                            : 'border-white bg-white'
                          : 'border-white/50'
                      }`}>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`text-xs sm:text-sm ${
                              showWrong ? '❌' : isCorrect ? '✓' : ''
                            }`}
                          >
                            {showWrong ? '❌' : isCorrect ? '✓' : (
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-600" />
                            )}
                          </motion.div>
                        )}
                      </div>
                      <p className="text-base sm:text-xl font-semibold text-white flex-1">
                        {option}
                      </p>
                    </div>
                  </motion.button>
                )
              })}
          </div>

          <motion.button
            onClick={handleSubmitGuess}
            disabled={!userGuess.trim() || !isGuessCorrect}
            className={`w-full px-8 py-5 rounded-2xl text-lg font-semibold transition-all shadow-lg ${
              userGuess.trim() && isGuessCorrect
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 cursor-pointer'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={userGuess.trim() && isGuessCorrect ? { scale: 1.02 } : {}}
            whileTap={userGuess.trim() && isGuessCorrect ? { scale: 0.98 } : {}}
          >
            {!userGuess.trim() 
              ? 'Chọn một đáp án'
              : isGuessCorrect
              ? 'Xác nhận'
              : 'Chọn lại xem'
            }
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
