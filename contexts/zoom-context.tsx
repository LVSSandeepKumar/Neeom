"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ZoomLevel = "small" | "normal" | "large" | "xl"

interface ZoomContextType {
  zoomLevel: ZoomLevel
  increaseZoom: () => void
  decreaseZoom: () => void
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined)

export function ZoomProvider({ children }: { children: React.ReactNode }) {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("normal")

  useEffect(() => {
    const savedZoom = localStorage.getItem("zoomLevel") as ZoomLevel
    if (savedZoom) {
      setZoomLevel(savedZoom)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("zoomLevel", zoomLevel)
    document.documentElement.className = document.documentElement.className
      .replace(/zoom-\w+/g, "")
      .concat(` zoom-${zoomLevel}`)
  }, [zoomLevel])

  const increaseZoom = () => {
    const levels: ZoomLevel[] = ["small", "normal", "large", "xl"]
    const currentIndex = levels.indexOf(zoomLevel)
    if (currentIndex < levels.length - 1) {
      setZoomLevel(levels[currentIndex + 1])
    }
  }

  const decreaseZoom = () => {
    const levels: ZoomLevel[] = ["small", "normal", "large", "xl"]
    const currentIndex = levels.indexOf(zoomLevel)
    if (currentIndex > 0) {
      setZoomLevel(levels[currentIndex - 1])
    }
  }

  return <ZoomContext.Provider value={{ zoomLevel, increaseZoom, decreaseZoom }}>{children}</ZoomContext.Provider>
}

export function useZoom() {
  const context = useContext(ZoomContext)
  if (context === undefined) {
    throw new Error("useZoom must be used within a ZoomProvider")
  }
  return context
}
