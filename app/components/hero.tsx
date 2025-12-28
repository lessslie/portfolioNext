"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const smoothScrollToId = (id: string, duration = 1400) => {
    if (typeof window === 'undefined') return
    const el = document.getElementById(id)
    if (!el) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.scrollIntoView({ behavior: 'auto', block: 'start' })
      return
    }
    const startY = window.scrollY || window.pageYOffset
    const targetY = el.getBoundingClientRect().top + startY
    const distance = targetY - startY
    let startTime: number | null = null
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = ease(progress)
      window.scrollTo(0, Math.round(startY + distance * eased))
      if (elapsed < duration) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="mb-4 text-5xl font-bold tracking-tighter sm:text-7xl lg:text-8xl text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Agata Morales
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-lg text-gray-300 sm:text-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to my portfolio!✨<br />
          FullStack Developer | Backend Developer
        </motion.p>
        <div className="flex gap-4 justify-center mb-2">
          <a href="https://github.com/lessslie" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded shadow transition">GitHub</a>
          <a href="https://www.linkedin.com/in/agata-morales/" target="_blank" rel="noopener noreferrer" className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded shadow transition">LinkedIn</a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=agata.morales92@gmail.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded shadow transition">E-mail</a>
        </div>
      </div>
      <a href="#portfolio" aria-label="Bajar al portafolio" onClick={(e) => { e.preventDefault(); smoothScrollToId('portfolio', 1400); }} className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-400">Scroll</span>
        <span className="animate-bounce inline-flex w-10 h-10 rounded-full border border-gray-600 items-center justify-center text-white/90 bg-black/30 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </span>
      </a>
    </div>
  )
}
