import { seoConfig } from "@/lib/seoConfig";

export const metadata = seoConfig.portfolio;

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
