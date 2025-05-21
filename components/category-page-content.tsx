"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResourceCard from "@/components/resource-card";
import { getResourcesByCategory } from "@/lib/api";
import type { Resource, PaginatedResponse } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationControls } from "@/components/ui/pagination";

interface CategoryPageContentProps {
  category: string;
  categoryColors: Record<string, string>;
  categoryIcons: Record<string, React.ReactNode>;
  categoryTitles: Record<string, string>;
  categoryDescriptions: Record<string, string>;
}

function ResourceCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Skeleton className="h-48 rounded-t-lg" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export default function CategoryPageContent({
  category,
  categoryColors,
  categoryIcons,
  categoryTitles,
  categoryDescriptions,
}: CategoryPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;
  const [paginatedResources, setPaginatedResources] =
    useState<PaginatedResponse<Resource> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const data = await getResourcesByCategory(category, currentPage);
        setPaginatedResources(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load resources");
        console.error("Error loading resources:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [category, currentPage]);

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    router.push(url.pathname + url.search);
  };

  return (
    <div className="min-h-screen">
      <div
        className={`py-16 ${categoryColors[category]} relative overflow-hidden`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-6">
              {categoryIcons[category]}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {categoryTitles[category]}
            </h1>
            <p className="text-muted-foreground text-lg bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              {categoryDescriptions[category]}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
            <p className="mt-2">Please try again later.</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ResourceCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedResources ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {paginatedResources.docs.length > 0 ? (
                paginatedResources.docs.map((resource: Resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    imageUrl={resource.imageUrl}
                    externalLink={resource.externalLink}
                    category={resource.category}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    No resources found in this category.
                  </p>
                </div>
              )}
            </div>

            {paginatedResources.totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={paginatedResources.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
