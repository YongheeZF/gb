'use client'

import { useEffect, useRef } from 'react'

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blackHoleRef = useRef<any>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // ParticleSpark class for the flowing spark effects
    class ParticleSpark {
      x: number
      y: number
      size: number
      angle: number
      speed: number
      opacity: number
      rotationRadius: number
      rotationAngle: number
      centerX: number
      centerY: number

      constructor(centerX: number, centerY: number) {
        this.centerX = centerX
        this.centerY = centerY
        this.rotationRadius = Math.random() * 100 + 50
        this.rotationAngle = Math.random() * Math.PI * 2
        this.x = centerX
        this.y = centerY
        this.size = Math.random() * 2 + 0.5
        this.angle = Math.random() * Math.PI * 2
        this.speed = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.5
      }

      update(blackHoleX: number, blackHoleY: number) {
        this.centerX = blackHoleX
        this.centerY = blackHoleY
        
        // Spiral motion
        this.rotationAngle += 0.02
        this.rotationRadius -= 0.5
        
        // Calculate new position
        this.x = this.centerX + Math.cos(this.rotationAngle) * this.rotationRadius
        this.y = this.centerY + Math.sin(this.rotationAngle) * this.rotationRadius
        
        // Fade out as they get closer to center
        this.opacity = Math.max(0, this.rotationRadius / 100)
        
        // Reset particle when it gets too close to center
        if (this.rotationRadius < 10) {
          this.reset()
        }
      }

      reset() {
        this.rotationRadius = Math.random() * 100 + 50
        this.rotationAngle = Math.random() * Math.PI * 2
        this.opacity = Math.random() * 0.5 + 0.5
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, ${50 + Math.random() * 50}, 50, ${this.opacity})`
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Star class remains the same
    class Star {
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
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

    // Comet class remains the same
    class Comet {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.speed = 0;
        this.angle = 0;
        this.opacity = 1;
        this.reset();
      }

      reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = 0;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 2 + 1;
        this.angle = 70 + Math.random() * 20;
        this.opacity = 1;
      }

      update() {
        const angleRad = (this.angle * Math.PI) / 180;
        this.x += Math.cos(angleRad) * this.speed;
        this.y += Math.sin(angleRad) * this.speed;

        if (this.y > this.canvas.height || this.x > this.canvas.width) {
          this.reset();
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

    // Updated BlackHole class
    class BlackHole {
      x: number
      y: number
      targetX: number
      targetY: number
      radius: number
      angle: number
      rotationSpeed: number
      lastFlareTime: number
      flareIntensity: number
      flareAngle: number
      flareBranches: Array<{angle: number, length: number, width: number}>
      sparks: ParticleSpark[]

      constructor() {
        this.x = (canvas?.width ?? window.innerWidth) / 2
        this.y = (canvas?.height ?? window.innerHeight) / 2
        this.targetX = this.x
        this.targetY = this.y
        this.radius = 80 // Increased radius
        this.angle = 0
        this.rotationSpeed = 0.001
        this.lastFlareTime = Date.now()
        this.flareIntensity = 0
        this.flareAngle = 0
        this.flareBranches = []
        // Initialize sparks
        this.sparks = Array(100).fill(null).map(() => new ParticleSpark(this.x, this.y))
      }

      update() {
        // Update rotation
        this.angle += this.rotationSpeed

        // Smooth movement towards target
        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        this.x += dx * 0.02
        this.y += dy * 0.02

        // Check if it's time for a new flare
        const currentTime = Date.now()
        if (currentTime - this.lastFlareTime > 30000) { // 30 seconds
          this.triggerFlare()
          this.lastFlareTime = currentTime
        }

        // Update flare intensity
        if (this.flareIntensity > 0) {
          this.flareIntensity -= 0.02
          this.flareAngle += 0.05
        }

        // Update sparks
        this.sparks.forEach(spark => spark.update(this.x, this.y))
      }

      triggerFlare() {
        this.flareIntensity = 1
        this.flareAngle = Math.random() * Math.PI * 2
        this.flareBranches = []
        
        // Create random branches for the flare
        const numBranches = Math.floor(Math.random() * 3) + 3
        for (let i = 0; i < numBranches; i++) {
          this.flareBranches.push({
            angle: this.flareAngle + (Math.random() - 0.5) * Math.PI / 2,
            length: this.radius * (2 + Math.random() * 2),
            width: 10 + Math.random() * 10
          })
        }
      }

      drawFlare() {
        if (!ctx || this.flareIntensity <= 0) return

        this.flareBranches.forEach(branch => {
          const gradient = ctx.createLinearGradient(
            this.x,
            this.y,
            this.x + Math.cos(branch.angle) * branch.length,
            this.y + Math.sin(branch.angle) * branch.length
          )

          gradient.addColorStop(0, `rgba(255, 50, 50, ${this.flareIntensity})`)
          gradient.addColorStop(0.3, `rgba(255, 150, 50, ${this.flareIntensity * 0.7})`)
          gradient.addColorStop(1, 'rgba(255, 50, 50, 0)')

          ctx.beginPath()
          ctx.strokeStyle = gradient
          ctx.lineWidth = branch.width * this.flareIntensity
          ctx.lineCap = 'round'
          ctx.moveTo(this.x, this.y)
          
          // Create a curved path for the flare
          const cp1x = this.x + Math.cos(branch.angle - 0.2) * branch.length * 0.5
          const cp1y = this.y + Math.sin(branch.angle - 0.2) * branch.length * 0.5
          const cp2x = this.x + Math.cos(branch.angle + 0.2) * branch.length * 0.7
          const cp2y = this.y + Math.sin(branch.angle + 0.2) * branch.length * 0.7
          const endX = this.x + Math.cos(branch.angle) * branch.length
          const endY = this.y + Math.sin(branch.angle) * branch.length
          
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY)
          ctx.stroke()

          // Add glow effect
          ctx.lineWidth = branch.width * this.flareIntensity * 2
          ctx.strokeStyle = `rgba(255, 100, 50, ${this.flareIntensity * 0.3})`
          ctx.stroke()
        })
      }

      setTarget(x: number, y: number) {
        this.targetX = x
        this.targetY = y
      }

      draw() {
        if (!ctx) return

        // Draw sparks first
        this.sparks.forEach(spark => spark.draw())

        // Draw flare effect
        this.drawFlare()

        // Draw core with enhanced glow
        const coreGradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 1.5
        )
        coreGradient.addColorStop(0, 'rgba(255, 50, 50, 0.8)')
        coreGradient.addColorStop(0.4, 'rgba(255, 0, 0, 0.5)')
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.fillStyle = coreGradient
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw ring with enhanced glow
        ctx.beginPath()
        ctx.ellipse(
          this.x,
          this.y,
          this.radius * 1.8,
          this.radius * 0.3,
          this.angle,
          0,
          Math.PI * 2
        )
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)'
        ctx.lineWidth = 4
        ctx.stroke()

        // Draw multiple ring glows for enhanced effect
        const glowColors = [
          'rgba(255, 0, 0, 0.2)',
          'rgba(255, 50, 0, 0.15)',
          'rgba(255, 100, 0, 0.1)'
        ]

        glowColors.forEach((color, index) => {
          ctx.beginPath()
          ctx.ellipse(
            this.x,
            this.y,
            this.radius * (1.8 + index * 0.1),
            this.radius * (0.3 + index * 0.05),
            this.angle,
            0,
            Math.PI * 2
          )
          ctx.strokeStyle = color
          ctx.lineWidth = 8 + index * 4
          ctx.stroke()
        })
      }
    }

    // Create objects
    const stars = Array(100).fill(null).map(() => new Star(canvas))
    const comets = Array(5).fill(null).map(() => new Comet(canvas))
    const blackHole = new BlackHole()
    blackHoleRef.current = blackHole

    // Handle mouse/touch movement
    const handleMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      blackHole.setTarget(x, y)
    }

    canvas.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY))
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      handleMove(touch.clientX, touch.clientY)
    })

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

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

      // Update and draw black hole
      blackHole.update()
      blackHole.draw()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (canvas) {
        canvas.removeEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY))
        canvas.removeEventListener('touchmove', (e) => {
          e.preventDefault()
          const touch = e.touches[0]
          handleMove(touch.clientX, touch.clientY)
        })
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{ 
        background: 'transparent',
        zIndex: 0,
        touchAction: 'none'
      }}
    />
  )
}

