import { motion } from 'framer-motion'
import { useState } from 'react'

interface Stage1Props {
  objects: any[]
  onObjectSelected: (obj: any) => void
}

export default function Stage1Sensory({ objects, onObjectSelected }: Stage1Props) {
  const [selectedObject, setSelectedObject] = useState<any>(null)

  const handleSelect = (obj: any) => {
    setSelectedObject(obj)
    onObjectSelected(obj)
    
    // Scroll to next stage
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    }, 800)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)'
      }}
    >
      {/* Title */}
      <div className="absolute top-20 left-0 right-0 text-center z-20">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-3"
        >
          Thực tiễn
        </motion.h2>
        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/90"
        >
          Chọn một hình để bắt đầu
        </motion.p>
      </div>

      {/* 5 partially hidden images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl">
        {objects.map((obj, index) => (
          <motion.button
            key={obj.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: selectedObject?.id === obj.id ? 1.1 : 1, 
              opacity: selectedObject && selectedObject.id !== obj.id ? 0.3 : 1 
            }}
            transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
            onClick={() => handleSelect(obj)}
            disabled={selectedObject !== null}
            className="relative group"
          >
            {/* Card container */}
            <motion.div
              className="w-48 h-48 rounded-2xl bg-white shadow-2xl overflow-hidden relative"
              whileHover={!selectedObject ? { scale: 1.05, rotate: 2 } : {}}
              whileTap={!selectedObject ? { scale: 0.98 } : {}}
            >
              {/* Full emoji - positioned to show only bottom-right corner - ALWAYS */}
              <div 
                className="absolute text-[200px] leading-none"
                style={{
                  bottom: '-60%',
                  right: '-60%',
                  filter: 'brightness(1.2)',
                }}
              >
                {obj.image}
              </div>

              {/* Overlay masks for 3 corners (top-left, top-right, bottom-left) - ALWAYS VISIBLE */}
              <>
                {/* Top-left corner mask */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-600 to-purple-700 opacity-95"></div>
                
                {/* Top-right corner mask */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-pink-600 to-pink-700 opacity-95"></div>
                
                {/* Bottom-left corner mask */}
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600 to-indigo-700 opacity-95"></div>

                {/* Question mark in center - only show when NOT selected */}
                {!selectedObject && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-7xl font-bold pointer-events-none z-10">
                    ?
                  </div>
                )}
              </>

              {/* Selected indicator - green border and checkmark */}
              {selectedObject?.id === obj.id && (
                <>
                  {/* Green border */}
                  <div className="absolute inset-0 border-8 border-green-500 rounded-2xl pointer-events-none z-30"></div>
                  
                  {/* Checkmark badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-3 right-3 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl z-40"
                  >
                    ✓
                  </motion.div>
                </>
              )}

              {/* Number badge */}
              <div className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 font-bold text-xl shadow-lg z-20">
                {index + 1}
              </div>

              {/* Hover hint */}
              {!selectedObject && (
                <div className="absolute bottom-3 left-3 right-3 text-center text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/50 rounded-lg py-1 px-2">
                  Click để chọn
                </div>
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Hint */}
      {!selectedObject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-20 text-center text-white/90"
        >
          <p className="text-lg font-medium">Chọn một hình để bắt đầu</p>
        </motion.div>
      )}

      {/* Selected message */}
      {selectedObject && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 text-center"
        >
          <div className="bg-white rounded-2xl px-8 py-4 shadow-2xl">
            <p className="text-gray-800 text-xl font-bold">
              Đã chọn! Giờ thu thập manh mối thôi
            </p>
          </div>
        </motion.div>
      )}

      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}
