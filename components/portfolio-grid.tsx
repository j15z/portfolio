"use client";

import { useState, useEffect } from "react";
import PortfolioCard, {
  PortfolioCardSkeleton,
  Project,
} from "@/components/portfolio-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search, Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PortfolioGridProps {
  initialProjects?: Project[];
  categories?: Array<{
    title: string;
    color?: string;
  }>;
  showViewAllButton?: boolean;
  maxProjects?: number;
  showSearchAndFilter?: boolean;
  itemsPerPage?: number;
}

export default function PortfolioGrid({
  initialProjects = [],
  categories = [],

  maxProjects,
  showSearchAndFilter = true,
  itemsPerPage = 6,
}: PortfolioGridProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(!initialProjects.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch projects from Sanity
  useEffect(() => {
    if (initialProjects.length === 0) {
      fetchProjects();
    }
  }, [initialProjects.length]);

  // Reset to first page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects based on search and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (project.technologies &&
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesCategory =
      selectedCategory === "" ||
      project.categories?.some((cat) => cat.title === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get projects for current page
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Limit projects if maxProjects is specified (for homepage usage)
  const displayProjects = maxProjects
    ? paginatedProjects.slice(0, maxProjects)
    : paginatedProjects;

  // Generate skeleton cards for loading state
  const skeletonCards = Array.from({ length: 4 }, (_, index) => (
    <div
      key={`skeleton-${index}`}
      className="w-full md:w-[calc(50%-0.5rem)] [@media(min-width:1300px)]:w-[calc(33.333%-0.67rem)] self-start"
    >
      <PortfolioCardSkeleton />
    </div>
  ));

  return (
    <div className="w-full p-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Portfolio
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          A collection of my recent projects and work
        </p>
      </div>

      {/* Search and Filter Controls */}
      {showSearchAndFilter && (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Results Count */}
            {!loading && (
              <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""} found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory && ` in "${selectedCategory}"`}
              </p>
            )}

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("")}
                    className="text-xs"
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.title}
                      variant={
                        selectedCategory === category.title
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category.title)}
                      className="text-xs"
                      style={
                        category.color && selectedCategory === category.title
                          ? { backgroundColor: category.color }
                          : {}
                      }
                    >
                      {category.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchProjects}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Portfolio Grid */}
      <div className="flex flex-wrap gap-4 justify-between">
        {loading ? (
          skeletonCards
        ) : displayProjects.length > 0 ? (
          displayProjects.map((project) => (
            <div
              key={project._id}
              className="w-full md:w-[calc(50%-0.5rem)] [@media(min-width:1300px)]:w-[calc(33.333%-0.67rem)] self-start"
            >
              <PortfolioCard project={project} />
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found.
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && !maxProjects && totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                  className={
                    currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {/* Show page numbers */}
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                // Show first page, last page, current page, and pages around current
                const shouldShow =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!shouldShow) {
                  // Show ellipsis for gaps
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
