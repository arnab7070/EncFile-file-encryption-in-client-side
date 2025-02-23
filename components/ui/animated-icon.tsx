"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface IconWrapperProps {
  icon: LucideIcon
  className?: string
}

export const IconWrapper = ({ icon: Icon, className }: IconWrapperProps) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={className}>
      <Icon className="h-4 w-4" />
    </motion.div>
  )
}

