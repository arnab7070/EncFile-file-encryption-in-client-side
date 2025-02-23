"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface SparklesCoreProps {
  id: string
  background: string
  minSize: number
  maxSize: number
  particleDensity: number
  className?: string
  particleColor: string
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const particles: { x: number; y: number; size: number }[] = []

    function initParticles() {
      particles.length = 0 // Clear existing particles
      for (let i = 0; i < particleDensity; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize - minSize) + minSize,
        })
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = particleColor
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function handleResize() {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      initParticles()
      drawParticles()
    }

    initParticles()
    drawParticles()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [id, background, minSize, maxSize, particleDensity, particleColor])

  return (
    <canvas
      id={id}
      className={className}
      style={{ background: background, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      ref={canvasRef}
    />
  )
}

