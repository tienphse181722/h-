import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'

interface Stage2Props {
  object: any
  approach: string
  onCharacteristicsSelected: (chars: string[]) => void
}

export default function Stage2Rational({ object, approach, onCharacteristicsSelected }: Stage2Props) {
  const [selectedChars, setSelectedChars] = useState<Set<string>>(new Set())
  const [canProceed, setCanProceed] = useState(false)
  const [hasProceeded, setHasProceeded] = useState(false)

  // Lọc đặc điểm theo approach và chỉ lấy 12 cái ngẫu nhiên (chỉ tính 1 lần)
  const filteredCharacteristics = useMemo(() => {
    const typeMap: { [key: string]: string } = {
      'observe': 'sensory',    // Nhìn – nghe – cảm nhận
      'analyze': 'rational',   // Suy nghĩ, phân tích
      'practice': 'practical'  // Thử áp dụng vào thực tế
    }
    
    const targetType = typeMap[approach] || 'sensory'
    
    // Lọc theo type, nếu không có type thì hiển thị tất cả
    const filtered = object.characteristics.filter((char: any) => 
      !char.type || char.type === targetType
    )
    
    const allChars = filtered.length > 0 ? filtered : object.characteristics
    
    // LỌC BỎ các đặc điểm có text chứa tên đáp án hoặc icon trùng với image đáp án
    const safeChars = allChars.filter((char: any) => {
      // Kiểm tra text không chứa tên đáp án
      const textContainsAnswer = char.text.toLowerCase().includes(object.name.toLowerCase())
      
      // Kiểm tra icon không trùng với image đáp án
      const iconMatchesImage = char.icon === object.image
      
      // Chỉ giữ lại nếu KHÔNG vi phạm cả 2 điều kiện
      return !textContainsAnswer && !iconMatchesImage
    })
    
    console.log('Debug Stage2:', {
      objectName: object.name,
      approach,
      targetType,
      totalChars: object.characteristics.length,
      afterTypeFilter: allChars.length,
      afterSafeFilter: safeChars.length,
      correctChars: safeChars.filter((c: any) => c.isCorrect).length,
      incorrectChars: safeChars.filter((c: any) => !c.isCorrect).length
    })
    
    // Tách đặc điểm đúng và sai
    const correctChars = safeChars.filter((char: any) => char.isCorrect)
    const incorrectChars = safeChars.filter((char: any) => !char.isCorrect)
    
    // Nếu không đủ đặc điểm, lấy từ tất cả (bỏ qua type filter)
    if (safeChars.length < 12) {
      console.warn('Not enough characteristics after filtering, using all types')
      const allSafeChars = object.characteristics.filter((char: any) => {
        const textContainsAnswer = char.text.toLowerCase().includes(object.name.toLowerCase())
        const iconMatchesImage = char.icon === object.image
        return !textContainsAnswer && !iconMatchesImage
      })
      
      const allCorrect = allSafeChars.filter((char: any) => char.isCorrect)
      const allIncorrect = allSafeChars.filter((char: any) => !char.isCorrect)
      
      const selectedCorrect = allCorrect
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(5, allCorrect.length))
      
      const selectedIncorrect = allIncorrect
        .sort(() => Math.random() - 0.5)
        .slice(0, 12 - selectedCorrect.length)
      
      return [...selectedCorrect, ...selectedIncorrect].sort(() => Math.random() - 0.5)
    }
    
    // Lấy tối đa 5 đặc điểm đúng
    const selectedCorrect = correctChars
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(5, correctChars.length))
    
    // Lấy đủ đặc điểm sai để tổng là 12
    const neededIncorrect = 12 - selectedCorrect.length
    const selectedIncorrect = incorrectChars
      .sort(() => Math.random() - 0.5)
      .slice(0, neededIncorrect)
    
    const result = [...selectedCorrect, ...selectedIncorrect].sort(() => Math.random() - 0.5)
    console.log('Final result:', result.length, 'characteristics')
    
    // Trộn lại và trả về
    return result
  }, [object, approach])

  // Get approach title
  const getApproachTitle = () => {
    const titles: { [key: string]: { title: string; subtitle: string; emoji: string } } = {
      'observe': {
        title: 'Cảm tính',
        subtitle: 'Chọn những gì bạn nhìn thấy, nghe thấy, cảm nhận được',
        emoji: '👁️'
      },
      'analyze': {
        title: 'Cảm tính',
        subtitle: 'Chọn những đặc điểm về bản chất, chức năng',
        emoji: '🧠'
      },
      'practice': {
        title: 'Cảm tính',
        subtitle: 'Chọn những hành động có thể làm để kiểm tra',
        emoji: '🔨'
      }
    }
    return titles[approach] || titles['observe']
  }

  const approachInfo = getApproachTitle()

  const handleSelect = (char: any) => {
    const newSelected = new Set(selectedChars)
    
    if (newSelected.has(char.text)) {
      newSelected.delete(char.text)
    } else {
      newSelected.add(char.text)
    }
    
    setSelectedChars(newSelected)
    setCanProceed(newSelected.size >= 4)
  }

  const handleProceed = () => {
    if (!canProceed) return
    
    const selected = Array.from(selectedChars)
    setHasProceeded(true)
    onCharacteristicsSelected(selected)
    
    // Scroll to next stage
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight * 2,
        behavior: 'smooth'
      })
    }, 300)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%)'
      }}
    >
      {/* Title Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8 z-20"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {approachInfo.title}
        </h2>
        <p className="text-xl text-gray-700 mb-2">
          {approachInfo.subtitle}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
            Tối thiểu: 4 đặc điểm
          </span>
          <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold">
            ⚠️ Có đặc điểm gây nhiễu!
          </span>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Central Object - Partially Hidden (same as Stage 1) */}
        <motion.div
          initial={{ scale: 0, y: -100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="flex flex-col items-center justify-center mb-12"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-30 scale-150"></div>
            
            {/* Main object - PARTIALLY HIDDEN */}
            <div className="relative w-64 h-64 bg-white rounded-3xl shadow-2xl border-4 border-blue-200 overflow-hidden">
              {/* Full emoji - positioned to show only bottom-right corner */}
              <div 
                className="absolute text-[280px] leading-none"
                style={{
                  bottom: '-60%',
                  right: '-60%',
                  filter: 'brightness(1.2)',
                }}
              >
                {object.image}
              </div>

              {/* Overlay masks for 3 corners */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-600 to-purple-700 opacity-95"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-pink-600 to-pink-700 opacity-95"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600 to-indigo-700 opacity-95"></div>
            </div>
          </div>
          
          {/* Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-gray-600 text-lg font-medium"
          >
            🤔 Đây là gì nhỉ? Hãy chọn đặc điểm để đoán!
          </motion.div>
        </motion.div>

        {/* Characteristics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filteredCharacteristics.map((char: any, index: number) => {
            const isSelected = selectedChars.has(char.text)
            
            return (
              <motion.button
                key={char.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.8 + index * 0.05,
                  type: 'spring',
                  stiffness: 200
                }}
                onClick={() => handleSelect(char)}
                className={`relative group ${
                  isSelected ? 'z-10' : 'z-0'
                }`}
              >
                <motion.div
                  className={`
                    relative p-5 rounded-2xl shadow-lg transition-all duration-300
                    ${isSelected
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-2xl scale-105'
                      : char.isCorrect
                      ? 'bg-white text-gray-800 hover:shadow-xl hover:scale-105 border-2 border-gray-200'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:shadow-xl hover:scale-105 border-2 border-gray-300'
                    }
                  `}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    !isSelected
                      ? { 
                          y: [0, -5, 0],
                        }
                      : {}
                  }
                  transition={
                    !isSelected
                      ? { 
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: index * 0.1
                        }
                      : {}
                  }
                >
                  {/* Icon */}
                  <div className="text-4xl mb-2 text-center">
                    {char.icon}
                  </div>
                  
                  {/* Text */}
                  <div className={`text-sm font-semibold text-center ${
                    isSelected ? 'text-white' : 'text-gray-700'
                  }`}>
                    {char.text}
                  </div>
                  
                  {/* Selected checkmark */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-lg shadow-lg"
                    >
                      ✓
                    </motion.div>
                  )}
                  
                  {/* Hover glow */}
                  {!isSelected && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl"></div>
                  )}
                </motion.div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Bottom Status Bar */}
      {/* Fixed bottom bar - only show if not proceeded yet */}
      {!hasProceeded && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border-2 border-gray-200 p-6 min-w-[400px]">
          <div className="flex items-center justify-between gap-6">
            {/* Counter */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                selectedChars.size >= 4 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {selectedChars.size}
              </div>
              <div>
                <div className="text-sm text-gray-500">Đã chọn</div>
                <div className="text-xs text-gray-400">
                  {selectedChars.size >= 4 ? '✓ Đủ để tiếp tục' : `Còn ${4 - selectedChars.size} nữa`}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedChars.size / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Proceed button */}
            {canProceed && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                onClick={handleProceed}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Tiếp tục →
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
      )}

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}
