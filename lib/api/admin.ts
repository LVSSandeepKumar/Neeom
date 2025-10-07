export interface CategoryCount {
  category: string;
  count: number;
}

export interface PortfolioProjectsAnalytics {
  totalCount: number;
  lastMonthCount: number;
  growthPercentage: string;
  byCategory: CategoryCount[];
}

export interface HeroSlidesAnalytics {
  totalCount: number;
  activeCount: number;
  lastMonthCount: number;
  growthPercentage: string;
}

export interface TeamMembersAnalytics {
  totalCount: number;
  lastMonthCount: number;
  growthPercentage: string;
  withProjectsCount: number;
  percentageWithProjects: string;
}

export interface AnalyticsData {
  portfolioProjects: PortfolioProjectsAnalytics;
  heroSlides: HeroSlidesAnalytics;
  teamMembers: TeamMembersAnalytics;
  timestamp: string;
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  const response = await fetch("/api/analytics");
  if (!response.ok) throw new Error("Failed to fetch analytics data");
  return response.json();
}