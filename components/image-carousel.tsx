"use client";

import type React from "react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  title: string;
  visibleItems?: number; // Optional prop to set the number of visible items
}

export function ImageCarousel({ images, title, visibleItems = 3 }: ImageCarouselProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Calculate the flex basis for each item based on the number of visible items
  const itemBasis = `${100 / visibleItems}%`;

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
          containScroll: "trimSnaps",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="flex">
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex-shrink-0" style={{ flexBasis: itemBasis }}>
              <div className="relative h-[400px] cursor-pointer" onClick={() => setZoomedImage(image)}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 disabled:opacity-50 disabled:pointer-events-auto" />
        <CarouselNext className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 disabled:opacity-50 disabled:pointer-events-auto" />
      </Carousel>

      <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative w-full h-[80vh]">
            {zoomedImage && <Image src={zoomedImage} alt={`${title} - Zoomed Image`} fill className="object-contain" />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}