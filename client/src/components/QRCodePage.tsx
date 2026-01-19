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

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'hanh-trinh-tri-thuc-qr.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    alert('Đã copy link!')
  }

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
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Quét mã QR
          </h2>
          <p className="text-gray-600">
            Quét để chơi trên điện thoại
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg border-4 border-purple-200">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* URL Display */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2 font-medium">Link trực tiếp:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-white px-3 py-2 rounded-lg text-sm border border-gray-300 focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>📱</span> Hướng dẫn:
          </h3>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li>Mở camera trên điện thoại</li>
            <li>Quét mã QR này</li>
            <li>Nhấn vào link hiện ra</li>
            <li>Bắt đầu chơi ngay!</li>
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            💾 Tải QR Code
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
