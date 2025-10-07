import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Heart } from "lucide-react"

export function MissionVision() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To create innovative, sustainable, and functional spaces that exceed our clients' expectations while contributing positively to the communities we serve.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading architectural and interior design firm known for transforming spaces and enriching lives through exceptional design and craftsmanship.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Integrity, innovation, sustainability, and client-centricity guide everything we do. We believe in building lasting relationships through trust and excellence.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mission, Vision & Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our core principles that drive everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <value.icon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
