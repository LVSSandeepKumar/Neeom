"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fetchHeroSlides, HeroSlide as ApiHeroSlide } from "@/lib/api/hero-slides";

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<ApiHeroSlide[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadSlides() {
      try {
        const data = await fetchHeroSlides();
        setSlides(data.filter((s) => s.isActive));
      } catch {
        setSlides([]);
      }
    }
    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Auto-slide every  seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleExploreMore = () => {
    router.push("/portfolio");
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hero Slider*/}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.backgroundImage || "/placeholder.svg"}
            alt={slide.mainTitle}
            // placeholder="blur"
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl text-white">
                {/* Main Category Header */}
                <div className="mb-6">
                  <p className="text-lg md:text-xl font-bold text-white/90 mb-2 tracking-wider uppercase">
                    Interior and Architectural Designs
                  </p>
                  <div className="w-24 h-1 bg-white/60"></div>
                </div>

                <p className="text-lg font-medium text-gray-200 mb-4 tracking-wider">{slide.mainTitle}</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{slide.subTitle}</h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">{slide.description}</p>
                <Button
                  size="lg"
                  onClick={handleExploreMore}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium"
                >
                  Explore More →
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <Button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
