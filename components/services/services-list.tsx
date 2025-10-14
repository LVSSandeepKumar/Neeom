import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, Hammer, Store, MessageSquare, ClipboardList, Ruler, Palette } from "lucide-react";

export function ServicesList() {
  const services = [
    {
      icon: Ruler,
      title: "Master Planning",
      description:
        "Comprehensive planning solutions for large-scale developments, urban projects, and community spaces with sustainable design principles.",
      features: ["Site Analysis", "Zoning Compliance", "Environmental Impact", "Community Integration"],
    },
    {
      icon: Building2,
      title: "Architectural Design",
      description:
        "Innovative architectural solutions that balance aesthetics with functionality, creating structures that stand the test of time.",
      features: ["Conceptual Design", "3D Modeling", "Technical Drawings", "Building Permits"],
    },
    {
      icon: Home,
      title: "Interior Design",
      description:
        "Creating beautiful, functional interior spaces that reflect your style and enhance your daily living or working experience.",
      features: ["Space Planning", "Material Selection", "Furniture Design", "Lighting Design"],
    },
    {
      icon: Hammer,
      title: "Design & Build",
      description:
        "Complete design-build services from initial concept to final construction, ensuring seamless project delivery under one roof.",
      features: ["Project Management", "Construction", "Quality Control", "Timeline Management"],
    },
    {
      icon: MessageSquare,
      title: "Consultation",
      description:
        "Expert advice and guidance for your design and construction projects, helping you make informed decisions at every stage.",
      features: ["Design Review", "Code Compliance", "Cost Estimation", "Feasibility Studies"],
    },
    {
      icon: ClipboardList,
      title: "Project Management",
      description:
        "Professional project management services ensuring your project is delivered on time, within budget, and to the highest quality standards.",
      features: ["Schedule Management", "Budget Control", "Quality Assurance", "Risk Management"],
    },
    {
      icon: Store,
      title: "Commercial Design",
      description:
        "Specialized commercial design services for retail, office, hospitality, and institutional projects that drive business success.",
      features: ["Brand Integration", "Customer Experience", "Operational Efficiency", "Compliance Standards"],
    },
    {
      icon: Palette,
      title: "Renovation & Remodeling",
      description:
        "Transform existing spaces with our renovation and remodeling services, breathing new life into outdated or underutilized areas.",
      features: ["Space Optimization", "Modern Updates", "Structural Changes", "Historic Preservation"],
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 anim-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What We Offer</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive design and construction services tailored to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 h-full anim-slide-up"
              style={{ "--index": index }}
            >
              <CardHeader>
                <service.icon className="h-12 w-12 text-gray-600 mb-4" />
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="w-2 h-2 bg-gray-600 rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
