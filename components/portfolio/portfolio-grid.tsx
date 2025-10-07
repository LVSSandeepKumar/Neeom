import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye, ArrowRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

interface PortfolioGridProps {
  selectedCategory: string;
  selectedSubCategory: string;
}

export function PortfolioGrid({ selectedCategory, selectedSubCategory }: PortfolioGridProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Get unique categories from projects API data
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ["All Projects", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All Projects") return true;
    if (selectedCategory !== project.category) return false;
    if (selectedSubCategory === `All ${selectedCategory}` || !selectedSubCategory) return true;
    return project.subcategory === selectedSubCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          {selectedCategory !== "All Projects" && <span> in {selectedCategory}</span>}
          {selectedSubCategory && selectedSubCategory !== `All ${selectedCategory}` && (
            <span> - {selectedSubCategory}</span>
          )}
        </p>
      </div>

      {/* Projects Grid - Square Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card
              key={project.id || project.projectNo}
              className="overflow-hidden hover:shadow-xl transition-all duration-500 group bg-white dark:bg-gray-800 border-0 shadow-lg"
            >
              {/* Square Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={project.images?.[0] || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured Badge */}
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                    Featured
                  </Badge>
                )}

                {/* Category Badge */}
                <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800 border-0 backdrop-blur-sm">
                  {project.subcategory}
                </Badge>

                {/* Hover Overlay with View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link href={`/portfolio/${project.projectNo}`}>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl transform scale-95 group-hover:scale-100 transition-all duration-300">
                      <Eye className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-6 space-y-4">
                {/* Title and Area */}
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 flex-1">
                    {project.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-500 ml-2 whitespace-nowrap">{project.area}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
                  {project.shortDescription || project.description}
                </p>

                {/* Location and Date */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Completed {formatDate(project.completionDate)}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="pt-2">
                  <Link href={`/portfolio/${project.id}`}>
                    <Button
                      variant="outline"
                      className="w-full group/btn border-gray-200 hover:border-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-300 bg-transparent"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* No Results */}
      {!isLoading && filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Eye className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try selecting a different category or subcategory to see our amazing projects.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
