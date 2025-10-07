"use client"

import { Button } from "@/components/ui/button"

interface PortfolioFiltersProps {
  selectedCategory: string
  selectedSubCategory: string
  onCategoryChange: (category: string) => void
  onSubCategoryChange: (subCategory: string) => void
}

export function PortfolioFilters({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
}: PortfolioFiltersProps) {
  const categories = ["All Projects", "Residential", "Commercial"]

  const subCategories = {
    "All Projects": [],
    Residential: ["All Residential", "Luxury Homes", "Apartments", "Condominiums", "Townhouses", "Renovations"],
    Commercial: [
      "All Commercial",
      "Office Spaces",
      "Retail Stores",
      "Restaurants",
      "Hotels",
      "Healthcare",
      "Educational",
    ],
  }

  const currentSubCategories =
    selectedCategory === "All Projects" ? [] : subCategories[selectedCategory as keyof typeof subCategories] || []

  return (
    <div className="space-y-6">
      {/* Main Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => {
                onCategoryChange(category)
                onSubCategoryChange(category === "All Projects" ? "" : `All ${category}`)
              }}
              className={
                selectedCategory === category
                  ? "bg-gray-700 hover:bg-gray-800 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Sub Categories */}
      {currentSubCategories.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{selectedCategory} Types</h3>
          <div className="flex flex-wrap gap-2">
            {currentSubCategories.map((subCategory) => (
              <Button
                key={subCategory}
                variant={selectedSubCategory === subCategory ? "default" : "outline"}
                size="sm"
                onClick={() => onSubCategoryChange(subCategory)}
                className={
                  selectedSubCategory === subCategory
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                }
              >
                {subCategory}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
