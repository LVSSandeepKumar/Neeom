import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Lightbulb, DraftingCompassIcon as Drafting, Hammer, CheckCircle } from "lucide-react"

export function ProcessSection() {
  const steps = [
    {
      icon: Search,
      title: "Discovery & Analysis",
      description:
        "We begin by understanding your needs, goals, and vision through detailed consultations and site analysis.",
      duration: "1-2 weeks",
    },
    {
      icon: Lightbulb,
      title: "Concept Development",
      description:
        "Our team develops initial concepts and design ideas, exploring various options to meet your requirements.",
      duration: "1 week",
    },
    {
      icon: Drafting,
      title: "Design Development",
      description:
        "We refine the chosen concept into detailed designs, including technical drawings and specifications.",
      duration: "3-4 weeks",
    },
    {
      icon: Hammer,
      title: "Construction & Implementation",
      description: "Our experienced team manages the construction process, ensuring quality and adherence to timeline.",
      duration: "Varies by project",
    },
    {
      icon: CheckCircle,
      title: "Completion & Handover",
      description:
        "Final inspections, quality checks, and project handover with ongoing support and maintenance guidance.",
      duration: "Varies by project",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Process</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A systematic approach to ensure your project is delivered successfully
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 relative">
              <CardHeader>
                <div className="relative">
                  <step.icon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <div className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                <div className="bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                  {step.duration}
                </div>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
