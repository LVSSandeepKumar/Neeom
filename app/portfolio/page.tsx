"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ZoomProvider } from "@/contexts/zoom-context";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { PortfolioSidebar } from "@/components/portfolio/portfolio-sidebar";
import { seoConfig } from "@/lib/seoConfig";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  return (
    <ZoomProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                  Our Portfolio
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Explore our diverse collection of residential and commercial design projects that showcase our
                  commitment to excellence
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar - Fixed width, scrollable content */}
                <div className="lg:w-80 flex-shrink-0">
                  <div className="lg:sticky lg:top-24">
                    <PortfolioSidebar
                      selectedCategory={selectedCategory}
                      selectedSubCategory={selectedSubCategory}
                      onCategoryChange={setSelectedCategory}
                      onSubCategoryChange={setSelectedSubCategory}
                    />
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <PortfolioGrid selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ZoomProvider>
  );
}
