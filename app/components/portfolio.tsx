"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function VideoCarousel({ videos, image, heightClass = "h-48" }: { videos: string[], image?: string, heightClass?: string }) {
  const slides = image ? [image, ...videos] : videos;
  const [current, setCurrent] = useState(0);
  const goLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const goRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="relative w-full">
      {typeof slides[current] === 'string' && slides[current].match(/\.(jpg|jpeg|png|svg)$/i) ? (
        <img
          src={slides[current]}
          alt="preview"
          className={`w-full ${heightClass} object-cover rounded-t`}
          style={{ background: '#222' }}
        />
      ) : (
        <video
          src={slides[current]}
          controls
          autoPlay
          muted
          className={`w-full ${heightClass} object-contain rounded-t`}
          style={{ background: '#222' }}
        />
      )}
      {slides.length > 1 && (
        <>
          <button
            onClick={goLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 z-10"
            aria-label="Anterior slide"
            type="button"
          >
            &#8592;
          </button>
          <button
            onClick={goRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 z-10"
            aria-label="Siguiente slide"
            type="button"
          >
            &#8594;
          </button>
        </>
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {slides.map((_, idx) => (
          <span key={idx} className={`w-2 h-2 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-500'} inline-block`} />
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "digital", "paintings", "sculptures"]

  const works = [
  {
    id: 1,
    title: "Plataforma de Gestión para Cementerio Parque Valle de Paz",
    description: "Backend Developer en un equipo de 6 desarrolladores. APIs RESTful, autenticación y roles, modelos de datos y documentación con Swagger.",
    year: "2024",
    technologies: ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "TypeORM", "JWT", "Swagger", "Nodemailer"],
    links: [
      { label: "Demo API", url: "https://cementerio-parque-api.onrender.com/api" },
      { label: "Demo Aplicación", url: "https://deployfront-rouge.vercel.app/" },
      { label: "Repositorio Backend", url: "https://github.com/ProyectoFinalGroup1/back" },
      { label: "Repositorio Frontend", url: "https://github.com/ProyectoFinalGroup1/front" }
    ],
    image: "/img-VallePaz.jpg"
  },
  {
    id: 2,
    title: "E-commerce Backend",
    description: "Backend completo de e-commerce con NestJS y TypeScript. Autenticación, productos, carrito, pedidos, arquitectura RESTful y documentación Swagger.",
    year: "2025",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Swagger", "Render", "Supabase"],
    links: [
      { label: "Documentación API", url: "https://ecommerce-g9u2.onrender.com/api" },
      { label: "Repositorio", url: "https://github.com/lessslie/Ecommerce" }
    ],
    image: "/img-ecommerce.png",
    videos: [
      "/videos/ecommerceSwagger.webm"
    ]
  },
  {
    id: 3,
    title: "Pelu Pet-shop",
    description: "Plataforma completa de e-commerce y servicios para mascotas. Frontend Next.js/React, backend robusto NestJS. Autenticación, inventario, pagos con MercadoPago.",
    year: "2025",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "Supabase", "JWT", "MercadoPago"],
    links: [
      { label: "Sitio Web", url: "https://petshop-frontend-eight.vercel.app" },
      { label: "Documentación API", url: "https://pelu-petshop.onrender.com/api" },
      { label: "Repositorio Frontend", url: "https://github.com/lessslie/petshop-frontend" },
      { label: "Repositorio Backend", url: "https://github.com/lessslie/Pelu-PetShop" }
    ],
    image: "/img-petshop.png",
    videos: [
      "/videos/petshopVideo.webm",
      "/videos/petshopSwagger.webm"
    ]
  },
  {
    id: 4,
    title: "Weather App",
    description: "App web para consultar el clima usando API externa. Frontend React, backend NestJS, documentación Swagger.",
    year: "2025",
    technologies: ["React", "NestJS", "TypeScript", "Docker", "Swagger", "Vercel", "Render"],
    links: [
      { label: "Sitio Web", url: "https://weather-app-docker.vercel.app/" },
      { label: "Documentación API", url: "https://weather-app-backend-fo0x.onrender.com/api/docs" },
      { label: "Repositorio", url: "https://github.com/lessslie/weather-app-docker" }
    ],
    image: "/img-app-clima.png",
    videos: [
      "/videos/video-app-clima.mp4",
      "/videos/app-clima-swagger.webm",
    ]
  }
];

  const filteredWorks = works;

  return (
  <section className="bg-black py-20">
    <div className="container mx-auto px-4">
      <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {works.map((work) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden bg-zinc-900 h-full flex flex-col min-h-[520px]">
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className="group relative flex flex-col h-full">
                    {Array.isArray(work.videos) && work.videos.length > 0 ? (
  <VideoCarousel videos={work.videos} image={work.image} heightClass="h-72" />
) : (
  <img
    src={work.image || "/placeholder.svg"}
    alt={work.title}
    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
  />
)}
                    <div className="flex-1 flex flex-col justify-between p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{work.title}</h3>
                        <p className="text-sm text-gray-300 mb-2">{work.year}</p>
                        <p className="text-gray-400 text-sm mb-4">{work.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {work.technologies && work.technologies.map((tech) => (
                            <span key={tech} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {work.links && work.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  </section>
)
}
