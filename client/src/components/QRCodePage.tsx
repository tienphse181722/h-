import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { motion } from 'framer-motion'

interface QRCodePageProps {
  onClose: () => void
}

export default function QRCodePage({ onClose }: QRCodePageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Link production cố định
  const [url] = useState('https://hanhtrinhchanly.vercel.app')

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
    }
  }, [url])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Quét mã QR
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Quét để chơi trên điện thoại
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg border-4 border-purple-200">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
        >
          Đóng
        </button>
      </motion.div>
    </motion.div>
  )
}
