"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { createContext, useEffect, useRef, useState } from "react"

const MouseEnterContext = createContext<{
  mouseX: number
  mouseY: number
  mouseXOnEnter: number
  mouseYOnEnter: number
}>({
  mouseX: 0,
  mouseY: 0,
  mouseXOnEnter: 0,
  mouseYOnEnter: 0,
})

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [mouseXOnEnter, setMouseXOnEnter] = useState(0)
  const [mouseYOnEnter, setMouseYOnEnter] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setMouseX(e.clientX - rect.left)
      setMouseY(e.clientY - rect.top)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setMouseXOnEnter(e.clientX - rect.left)
      setMouseYOnEnter(e.clientY - rect.top)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  return (
    <MouseEnterContext.Provider value={{ mouseX, mouseY, mouseXOnEnter, mouseYOnEnter }}>
      <div
        ref={containerRef}
        className={cn("p-1 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl", containerClassName)}
      >
        <div
          className={cn("bg-black rounded-xl p-8", className)}
          style={{
            transform: `perspective(1000px) rotateX(${(mouseY - mouseYOnEnter) / 40}deg) rotateY(${-(mouseX - mouseXOnEnter) / 40}deg) translateZ(0)`,
            transition: "all 0.15s ease-out",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

