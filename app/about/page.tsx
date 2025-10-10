import { Navbar } from "@/components/navbar";
import { ZoomProvider } from "@/contexts/zoom-context";
import { AboutHero } from "@/components/about/about-hero";
import { CompanyStory } from "@/components/about/company-story";
import { MissionVision } from "@/components/about/mission-vision";
import { TeamIntroduction } from "@/components/about/team-introduction";
import { seoConfig } from "@/lib/seoConfig";

export const metadata = seoConfig.about;

export default function AboutPage() {
  return (
    <ZoomProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <AboutHero />
          <CompanyStory />
          <MissionVision />
          <TeamIntroduction />
        </main>
      </div>
    </ZoomProvider>
  );
}
