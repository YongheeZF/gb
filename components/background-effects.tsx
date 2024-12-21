'use client'

import { useEffect, useRef } from 'react'

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Getters for canvas width and height
    const getCanvasWidth = () => canvas?.width ?? 0
    const getCanvasHeight = () => canvas?.height ?? 0

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Comet class
    class Comet {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;

      constructor() {
        // Initialize all properties in constructor
        this.x = Math.random() * getCanvasWidth()
        this.y = 0
        this.length = Math.random() * 80 + 20
        this.speed = Math.random() * 2 + 1
        this.angle = 70 + Math.random() * 20
        this.opacity = 1
      }

      reset() {
        this.x = Math.random() * getCanvasWidth()
        this.y = 0
        this.length = Math.random() * 80 + 20
        this.speed = Math.random() * 2 + 1
        this.angle = 70 + Math.random() * 20
        this.opacity = 1
      }

      update() {
        const angleRad = (this.angle * Math.PI) / 180
        this.x += Math.cos(angleRad) * this.speed
        this.y += Math.sin(angleRad) * this.speed

        if (this.y > getCanvasHeight() || this.x > getCanvasWidth()) {
          this.reset()
        }
      }

      draw() {
        if (!ctx) return

        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos((this.angle * Math.PI) / 180) * this.length,
          this.y - Math.sin((this.angle * Math.PI) / 180) * this.length
        )

        gradient.addColorStop(0, `rgba(255, 50, 50, ${this.opacity})`)
        gradient.addColorStop(1, 'rgba(255, 50, 50, 0)')

        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(
          this.x - Math.cos((this.angle * Math.PI) / 180) * this.length,
          this.y - Math.sin((this.angle * Math.PI) / 180) * this.length
        )
        ctx.stroke()
      }
    }

    // Star class
    class Star {
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number

      constructor() {
        this.x = Math.random() * getCanvasWidth()
        this.y = Math.random() * getCanvasHeight()
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random()
        this.twinkleSpeed = Math.random() * 0.02
      }

      update() {
        this.opacity += Math.sin(Date.now() * this.twinkleSpeed) * 0.02
        this.opacity = Math.max(0, Math.min(1, this.opacity))
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 100, 100, ${this.opacity})`
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create comets and stars
    const comets: Comet[] = Array(5).fill(null).map(() => new Comet())
    const stars: Star[] = Array(100).fill(null).map(() => new Star())

    // Animation loop
    const animate = () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, getCanvasWidth(), getCanvasHeight())

        // Update and draw stars
        stars.forEach(star => {
          star.update()
          star.draw()
        })

        // Update and draw comets
        comets.forEach(comet => {
          comet.update()
          comet.draw()
        })
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}