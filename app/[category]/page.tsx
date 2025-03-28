import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ResourceCard from "@/components/resource-card"
import { getResourcesByCategory } from "@/lib/data"
import { FileText, Music, Book, Video } from "lucide-react"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryMap: Record<string, string> = {
    sermons: "Sermons",
    worship: "Worship",
    books: "Books",
    movies: "Movies",
  }

  const title = categoryMap[params.category]

  if (!title) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${title} - Dunamis Faith Resource Hub`,
    description: `Explore our collection of Christian ${params.category} to nurture your spiritual journey.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const validCategories = ["sermons", "worship", "books", "movies"]

  if (!validCategories.includes(params.category)) {
    notFound()
  }

  const resources = getResourcesByCategory(params.category as any)

  const categoryTitles: Record<string, string> = {
    sermons: "Sermons",
    worship: "Worship Resources",
    books: "Christian Books",
    movies: "Christian movies",
  }

  const categoryDescriptions: Record<string, string> = {
    sermons: "Inspiring messages from renowned preachers to strengthen your faith journey.",
    worship: "Uplifting worship music and resources to enhance your spiritual experience.",
    books: "Enlightening Christian literature to deepen your understanding of faith.",
    movies: "Visual content including testimonies, teachings, and inspirational stories.",
  }

  const categoryIcons: Record<string, React.ReactNode> = {
    sermons: <FileText size={36} className="text-primary" />,
    worship: <Music size={36} className="text-secondary" />,
    books: <Book size={36} className="text-tertiary" />,
    movies: <Video size={36} className="text-quaternary" />,
  }

  const categoryColors: Record<string, string> = {
    sermons: "gradient-bg",
    worship: "gradient-bg-blue",
    books: "gradient-bg-purple",
    movies: "gradient-bg-green",
  }

  return (
    <div className="min-h-screen">
      <div className={`py-16 ${categoryColors[params.category]} relative overflow-hidden`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-6">
              {categoryIcons[params.category]}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{categoryTitles[params.category]}</h1>
            <p className="text-muted-foreground text-lg bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              {categoryDescriptions[params.category]}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              imageUrl={resource.imageUrl}
              externalLink={resource.externalLink}
              category={resource.category}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

