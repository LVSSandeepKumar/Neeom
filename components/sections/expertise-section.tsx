import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Home, Hammer, MessageSquare, ClipboardList } from "lucide-react"

export function ExpertiseSection() {
  const services = [
    {
      icon: Building2,
      title: "Master Planning",
      description: "Comprehensive planning solutions for large-scale developments and urban projects.",
    },
    {
      icon: Building2,
      title: "Architectural Design",
      description: "Innovative architectural solutions that balance aesthetics with functionality.",
    },
    {
      icon: Home,
      title: "Interior Design",
      description: "Creating beautiful, functional interior spaces that reflect your style and needs.",
    },
    {
      icon: Hammer,
      title: "Design & Build",
      description: "Complete design-build services from concept to completion under one roof.",
    },
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "Expert advice and guidance for your design and construction projects.",
    },
    {
      icon: ClipboardList,
      title: "Project Management",
      description: "Professional project management ensuring timely and budget-conscious delivery.",
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 anim-slide-up">Our Expertise</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto anim-slide-up">
            We offer comprehensive design and construction services to bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow duration-300 anim-slide-up`} style={{ "--index": index }}>
              <CardHeader>
                <service.icon className="h-12 w-12 text-gray-600 mb-4" />
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
