import { Navbar } from "@/components/navbar"
import { ZoomProvider } from "@/contexts/zoom-context"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesList } from "@/components/services/services-list"
import { ProcessSection } from "@/components/services/process-section"
import { ContactCTA } from "@/components/services/contact-cta"

export default function ServicesPage() {
  return (
    <ZoomProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <ServicesHero />
          <ServicesList />
          <ProcessSection />
          <ContactCTA />
        </main>
      </div>
    </ZoomProvider>
  )
}
