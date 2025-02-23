"use client"
import { motion } from "framer-motion"

export const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-[40rem] left-1/2 -translate-x-1/2 flex justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5, scale: 0.5 }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
            }}
            className="w-[600px] h-[600px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{
              transformOrigin: "center center",
            }}
          />
        ))}
      </div>
    </div>
  )
}

