import { useState } from 'react'
import { motion } from 'framer-motion'
import { getRandomObjects } from '../data/objects'

interface TopicInputProps {
  onStart: (approach: string, objects: any[]) => void
}

export default function TopicInput({ onStart }: TopicInputProps) {
  const [selectedApproach, setSelectedApproach] = useState<string | null>(null)

  const approaches = [
    { id: 'observe', label: 'Quan sát kỹ', desc: 'Nhìn, nghe, cảm nhận', icon: '👁️', color: 'from-blue-500 to-cyan-500' },
    { id: 'analyze', label: 'Suy nghĩ', desc: 'Phân tích, rút kết luận', icon: '🧠', color: 'from-purple-500 to-pink-500' },
    { id: 'practice', label: 'Thử nghiệm', desc: 'Làm thử xem sao', icon: '🔨', color: 'from-orange-500 to-red-500' }
  ]

  const handleStart = () => {
    if (!selectedApproach) return
    const randomObjects = getRandomObjects(5)
    onStart(selectedApproach, randomObjects)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 md:mb-4">
            Hành trình Tri thức
          </h1>
          <p className="text-lg sm:text-xl text-white/80">
            Cùng khám phá cách bạn nhận biết thế giới
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Bạn thường hiểu mọi thứ bằng cách nào?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-6 md:mb-8">
            Chọn cách mà bạn hay dùng nhất
          </p>

          {/* Approach options */}
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            {approaches.map((approach, idx) => (
              <motion.button
                key={approach.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                onClick={() => setSelectedApproach(approach.id)}
                className={`w-full p-4 sm:p-5 rounded-xl md:rounded-2xl text-left transition-all border-2 ${
                  selectedApproach === approach.id
                    ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${approach.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}>
                    {approach.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-bold text-gray-800">{approach.label}</div>
                    <div className="text-sm text-gray-500">{approach.desc}</div>
                  </div>
                  {selectedApproach === approach.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Start button */}
          <motion.button
            onClick={handleStart}
            disabled={!selectedApproach}
            className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${
              selectedApproach
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={selectedApproach ? { scale: 1.02 } : {}}
            whileTap={selectedApproach ? { scale: 0.98 } : {}}
          >
            {selectedApproach ? 'Bắt đầu thôi →' : 'Chọn một cách ở trên nhé'}
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/70 mt-6 text-sm"
        >
          💡 Mỗi người có cách học khác nhau - không có đúng sai
        </motion.p>
      </div>
    </div>
  )
}
