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
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 sm:py-20 px-3 sm:px-4"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)'
      }}
    >
      {/* Title */}
      <div className="absolute top-8 sm:top-12 md:top-16 left-0 right-0 text-center z-20 px-3">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2"
        >
          Thực tiễn
        </motion.h2>
        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-white/90"
        >
          Chọn một hình để bắt đầu
        </motion.p>
      </div>

      {/* 5 partially hidden images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 w-full max-w-4xl mt-16 sm:mt-20">
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
            className="relative group w-full aspect-square"
          >
            {/* Card container */}
            <motion.div
              className="w-full h-full rounded-lg sm:rounded-xl bg-white shadow-lg overflow-hidden relative"
              whileHover={!selectedObject ? { scale: 1.03, rotate: 1 } : {}}
              whileTap={!selectedObject ? { scale: 0.98 } : {}}
            >
              {/* Full emoji - positioned to show only bottom-right corner - ALWAYS */}
              <div 
                className="absolute text-[80px] sm:text-[100px] md:text-[120px] leading-none"
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
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold pointer-events-none z-10">
                    ?
                  </div>
                )}
              </>

              {/* Selected indicator - green border and checkmark */}
              {selectedObject?.id === obj.id && (
                <>
                  {/* Green border */}
                  <div className="absolute inset-0 border-2 sm:border-3 md:border-4 border-green-500 rounded-lg sm:rounded-xl pointer-events-none z-30"></div>
                  
                  {/* Checkmark badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm sm:text-lg shadow-lg z-40"
                  >
                    ✓
                  </motion.div>
                </>
              )}

              {/* Number badge */}
              <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center text-gray-800 font-bold text-xs sm:text-sm shadow-md z-20">
                {index + 1}
              </div>

              {/* Hover hint */}
              {!selectedObject && (
                <div className="absolute bottom-1.5 left-1.5 right-1.5 text-center text-white text-[9px] sm:text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/50 rounded py-0.5 px-1">
                  Chọn
                </div>
              )}
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Selected message */}
      {selectedObject && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-12 sm:bottom-16 text-center px-3"
        >
          <div className="bg-white rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-2.5 shadow-xl">
            <p className="text-gray-800 text-xs sm:text-sm md:text-base font-bold">
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
