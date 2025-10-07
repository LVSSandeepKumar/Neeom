import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export function TestimonialsList() {
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Martinez",
      role: "Homeowner",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "NEEOM Designs transformed our outdated home into a modern masterpiece. Their attention to detail and creative solutions exceeded our expectations. The team was professional, responsive, and delivered on time.",
      project: "Residential Renovation",
    },
    {
      id: 2,
      name: "Robert Chen",
      role: "Business Owner",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Working with NEEOM on our office redesign was fantastic. They understood our brand and created a space that not only looks amazing but also improves our team's productivity and client experience.",
      project: "Commercial Office Design",
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Property Developer",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "I've worked with many design firms, but NEEOM stands out for their innovative approach and project management skills. They delivered a complex multi-unit project flawlessly.",
      project: "Residential Complex",
    },
    {
      id: 4,
      name: "Michael Thompson",
      role: "Restaurant Owner",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "The restaurant design by NEEOM has been instrumental in our success. The ambiance they created perfectly matches our concept and has received countless compliments from customers.",
      project: "Restaurant Interior",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Homeowner",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "From initial consultation to final walkthrough, NEEOM provided exceptional service. They listened to our needs and created a beautiful, functional space that our family loves.",
      project: "Kitchen Renovation",
    },
    {
      id: 6,
      name: "David Park",
      role: "Hotel Manager",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "NEEOM's design for our boutique hotel lobby has become a signature feature. Guests constantly compliment the space, and it has significantly enhanced our brand image.",
      project: "Hotel Lobby Design",
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real feedback from real clients who trusted us with their projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>

                <div className="bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {testimonial.project}
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>
    </section>
  )
}
