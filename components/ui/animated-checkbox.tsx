"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const AnimatedCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md border border-purple-500/20 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50",
      "bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <motion.svg
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="h-4 w-4 text-purple-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          exit={{ pathLength: 0 }}
          transition={{ duration: 0.2 }}
          d="M20 6L9 17L4 12"
        />
      </motion.svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
AnimatedCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { AnimatedCheckbox }

