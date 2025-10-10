import { Navbar } from "@/components/navbar"
import { HeroSlider } from "@/components/hero-slider"
import { AboutSection } from "@/components/sections/about-section"
import { ExpertiseSection } from "@/components/sections/expertise-section"
import { PortfolioPreview } from "@/components/sections/portfolio-preview"
import { LeadershipSection } from "@/components/sections/leadership-section"
import { ZoomProvider } from "@/contexts/zoom-context"
import "../styles/globals.css"
import { seoConfig } from "@/lib/seoConfig"

export const metadata = seoConfig.home;

export default function HomePage() {
  return (
    <ZoomProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSlider />
          <AboutSection />
          <ExpertiseSection />
          <PortfolioPreview />
          <LeadershipSection />
        </main>
      </div>
    </ZoomProvider>
  )
}
