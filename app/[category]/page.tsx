import type React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceCard from "@/components/resource-card";
import { getResourcesByCategory } from "@/lib/api";
import type { Resource } from "@/lib/api";
import { FileText, Music, Book, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryMap: Record<string, string> = {
  sermon: "Sermons",
  worship: "Worship",
  book: "Books",
  movie: "Movies",
};

const categoryTitles: Record<string, string> = {
  sermon: "Sermons",
  worship: "Worship Resources",
  book: "Christian Books",
  movie: "Christian Movies",
};

const categoryDescriptions: Record<string, string> = {
  sermon:
    "Inspiring messages from renowned preachers to strengthen your faith journey.",
  worship:
    "Uplifting worship music and resources to enhance your spiritual experience.",
  book: "Enlightening Christian literature to deepen your understanding of faith.",
  movie:
    "Visual content including testimonies, teachings, and inspirational stories.",
};

const categoryIcons: Record<string, React.ReactNode> = {
  sermon: <FileText size={36} className="text-primary" />,
  worship: <Music size={36} className="text-secondary" />,
  book: <Book size={36} className="text-tertiary" />,
  movie: <Video size={36} className="text-quaternary" />,
};

const categoryColors: Record<string, string> = {
  sermon: "gradient-bg",
  worship: "gradient-bg-blue",
  book: "gradient-bg-purple",
  movie: "gradient-bg-green",
};

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

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = params?.category;
  const title = categoryMap[category];

  if (!title) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${title} - Dunamis Faith Resource Hub`,
    description: `Explore our collection of Christian ${category} to nurture your spiritual journey.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = params?.category;
  const validCategories = ["sermon", "worship", "book", "movie"];

  if (!category || !validCategories.includes(category)) {
    notFound();
  }

  // Fetch resources (no authentication needed)
  let resources: Resource[] = [];
  let error: string | null = null;

  try {
    resources = await getResourcesByCategory(category);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load resources";
    console.error("Error loading resources:", e);
  }

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

      <div className="container mx-auto px-4 py-12">
        {error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
            <p className="mt-2">Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.length > 0
              ? resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    imageUrl={resource.imageUrl}
                    externalLink={resource.externalLink}
                    category={resource.category}
                  />
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <ResourceCardSkeleton key={i} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
