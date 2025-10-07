"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { useZoom } from "@/contexts/zoom-context"

export function ZoomControls() {
  const { increaseZoom, decreaseZoom } = useZoom()

  return (
    <div className="flex items-center space-x-1">
      <Button variant="ghost" size="sm" onClick={decreaseZoom} aria-label="Decrease font size">
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={increaseZoom} aria-label="Increase font size">
        <ZoomIn className="h-4 w-4" />
      </Button>
    </div>
  )
}
