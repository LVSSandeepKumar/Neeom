"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { ZoomProvider } from "@/contexts/zoom-context";
import { ReviewsHero } from "@/components/reviews/reviews-hero";
import { TestimonialsList } from "@/components/reviews/testimonials-list";
import { ReviewStats } from "@/components/reviews/review-stats";
import { Star, Users, Repeat, ThumbsUp } from "lucide-react";
import { seoConfig } from "@/lib/seoConfig";

// Define interface for stat structure
interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  description: string;
}

// Define interface for API data
interface StaticInfo {
  key: string;
  value: string;
}

export default function ReviewsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);

  // Map API keys to stat structure
  const statConfig: { [key: string]: Stat } = {
    averageRating: { icon: Star, title: "Average Rating", value: "", description: "Based on 150+ reviews" },
    happyClients: { icon: Users, title: "Happy Clients", value: "", description: "Satisfied customers" },
    repeatClients: { icon: Repeat, title: "Repeat Clients", value: "", description: "Return for new projects" },
    recommendationRate: { icon: ThumbsUp, title: "Recommendation Rate", value: "", description: "Would recommend us" },
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async (): Promise<void> => {
    try {
      const response = await fetch("/api/staticInfo");
      const data: StaticInfo[] = await response.json();
      if (response.ok) {
        // Map API data to stat structure
        const mappedStats: Stat[] = data
          .filter((item) => statConfig[item.key]) // Only include keys defined in statConfig
          .map((item) => ({
            ...statConfig[item.key],
            value: item.value,
          }));
        setStats(mappedStats);
        const ratingItem = data.find((item) => item.key === "averageRating");
        if (ratingItem) {
          setAverageRating(parseFloat(ratingItem.value));
        }
      } else {
        setError("Failed to fetch stats");
      }
    } catch (err) {
      setError("Error fetching stats");
    }
  };

  return (
    <ZoomProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          {error && <div className="max-w-4xl mx-auto px-6 py-4 bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

          <ReviewsHero rating={averageRating} />
          <ReviewStats stats={stats} />
          {/* `{JSON.stringify(stats)}` */}
          <TestimonialsList />
        </main>
      </div>
    </ZoomProvider>
  );
}
