import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">About NEEOM Designs</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              NEEOM Designs is a premier architecture and interior design firm with over 15 years of experience crafting
              exceptional spaces. We believe that design is more than just aesthetics; it's about creating environments
              that enhance the way people live, work, and interact.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Our team of talented designers and architects collaborates closely with clients to understand their unique
              needs and aspirations. We specialize in a wide range of projects, including residential, commercial, and
              institutional spaces, always prioritizing sustainable design practices and innovative technologies.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              From initial concept to final execution, we are committed to delivering projects that exceed expectations.
              Our comprehensive approach ensures meticulous attention to detail, seamless integration of design
              elements, and unwavering dedication to client satisfaction. We strive to create spaces that are not only
              beautiful but also functional, sustainable, and truly reflective of our clients' vision.
            </p>
            <Link href="/about">
              <Button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 text-lg">
                Learn More About Us
              </Button>
            </Link>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image src="/about-image.jpg" alt="NEEOM Designs Office Interior" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
