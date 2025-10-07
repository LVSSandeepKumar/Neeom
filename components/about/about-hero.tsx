"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function AboutHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = ["/about-image.jpg", "/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt="About NEEOM Designs"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative text-center text-white max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About NEEOM Designs</h1>
        <p className="text-xl md:text-2xl text-gray-200">
          Creating exceptional spaces through innovative design and expert craftsmanship
        </p>
      </div>
    </section>
  )
}
