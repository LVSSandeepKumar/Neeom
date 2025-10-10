import { seoConfig } from "@/lib/seoConfig";

export const metadata = seoConfig.reviews;

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
