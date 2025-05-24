import type React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText, Music, Book, Video } from "lucide-react";
import CategoryPageContent from "@/components/category-page-content";
import { Suspense } from "react";

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

export function generateStaticParams() {
  return [
    { category: "sermon" },
    { category: "worship" },
    { category: "book" },
    { category: "movie" },
  ];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await Promise.resolve(params.category);
  const title = categoryMap[category];

  if (!title) {
    return { title: "Category Not Found" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title: `${title} - Dunamis Faith Resource Hub`,
    description: `Explore our collection of Christian ${category} to nurture your spiritual journey.`,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${title} - Dunamis Faith Resource Hub`,
      description: `Explore our collection of Christian ${category} to nurture your spiritual journey.`,
      url: `${baseUrl}/${category}`,
      siteName: "Dunamis Faith Resource Hub",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - Dunamis Faith Resource Hub`,
      description: `Explore our collection of Christian ${category} to nurture your spiritual journey.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await Promise.resolve(params.category);
  const validCategories = ["sermon", "worship", "book", "movie"];

  if (!category || !validCategories.includes(category)) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      }
    >
      <CategoryPageContent
        category={category}
        categoryColors={categoryColors}
        categoryIcons={categoryIcons}
        categoryTitles={categoryTitles}
        categoryDescriptions={categoryDescriptions}
      />
    </Suspense>
  );
}
