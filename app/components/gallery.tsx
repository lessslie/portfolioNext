"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const images: { src: string; alt: string; title: string }[] = []

  return (
    <section className="relative py-20">
      <div ref={ref} className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          🧉
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {images.length === 0 ? (
  <div className="text-center text-gray-300 col-span-full py-12 text-lg flex flex-col items-center gap-2">
    <span className="font-semibold text-white">Hola, soy Agata.</span>
    <span>Programadora fullstack con foco en backend y APIs escalables.</span>
    <span>Trabajo principalmente con TypeScript, Node.js, NestJS, PostgreSQL y Swagger.</span>
    <span>Siempre aprendiendo y buscando nuevos desafíos en el mundo tech.</span>
    <div className="flex flex-wrap gap-2 justify-center mt-3">
      <span className="bg-zinc-800 text-gray-200 text-xs px-2 py-1 rounded">TypeScript</span>
      <span className="bg-zinc-800 text-gray-200 text-xs px-2 py-1 rounded">NestJS</span>
      <span className="bg-zinc-800 text-gray-200 text-xs px-2 py-1 rounded">Node.js</span>
      <span className="bg-zinc-800 text-gray-200 text-xs px-2 py-1 rounded">PostgreSQL</span>
      <span className="bg-zinc-800 text-gray-200 text-xs px-2 py-1 rounded">Swagger</span>
      <span className="bg-zinc-800 text-gray-200 text-xs px-2 py-1 rounded">GitHub</span>
    </div>
  </div>
) : (
  images.map((image, index) => (
    <motion.div
      key={index}
      className="group relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-xl font-semibold text-white">{image.title}</h3>
      </div>
    </motion.div>
  ))
)}
        </div>
      </div>
    </section>
  )
}
