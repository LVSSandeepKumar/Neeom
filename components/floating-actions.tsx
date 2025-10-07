"use client"

import { Phone, MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)

  const handleCall = () => {
    window.location.href = "tel:+919032172303"
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in NEEOM Designs interior and architectural services. Can you help me?",
    )
    window.open(`https://wa.me/919032172303?text=${message}`, "_blank")
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end space-y-4">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              onClick={handleCall}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors"
              title="Call NEEOM Designs"
            >
              <Phone className="h-5 w-5" />
            </motion.button>

            <motion.button
              onClick={handleWhatsApp}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors"
              title="WhatsApp NEEOM Designs"
            >
              <MessageCircle className="h-5 w-5" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Main N Icon Button with Enhanced Animation */}
      <motion.button
        onClick={toggleMenu}
        whileHover={{
          scale: 1.15,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#374151",
        }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="bg-gray-800 text-white w-14 h-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-600 hover:border-gray-400 relative overflow-hidden"
        title="Contact NEEOM Designs"
      >
        {/* Animated background gradient */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(45deg, #1f2937, #374151)",
              "linear-gradient(45deg, #374151, #4b5563)",
              "linear-gradient(45deg, #1f2937, #374151)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full"
        />

        <div className="relative w-5 h-5 flex items-center justify-center z-10">
          <motion.div
            animate={{
              opacity: isOpen ? 0 : 1,
              rotate: isOpen ? -90 : 0,
              scale: isOpen ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Stylish animated N */}
            <motion.span
              animate={{
                textShadow: [
                  "0 0 5px rgba(255,255,255,0.5)",
                  "0 0 10px rgba(255,255,255,0.8)",
                  "0 0 5px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-white font-bold text-lg leading-none select-none"
              style={{
                fontFamily: "serif",
                fontWeight: "900",
              }}
            >
              N
            </motion.span>
          </motion.div>

          <motion.div
            animate={{
              opacity: isOpen ? 1 : 0,
              rotate: isOpen ? 0 : 90,
              scale: isOpen ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Enhanced pulse animation ring */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border-2 border-white"
        />

        {/* Secondary pulse ring */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute inset-0 rounded-full border border-gray-300"
        />
      </motion.button>
    </div>
  )
}
