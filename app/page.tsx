import HeroSection from "@/components/hero-section"
import CategoryCard from "@/components/category-card"
import ResourceCard from "@/components/resource-card"
import { Book, FileText, Music, Video, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getResourcesByCategory } from "@/lib/data"

export default function Home() {
  const categories = [
    {
      title: "Sermons",
      description: "Inspiring messages from renowned preachers to strengthen your faith",
      icon: FileText,
      href: "/sermons",
      color: "primary" as const,
    },
    {
      title: "Worship",
      description: "Uplifting worship music and resources to enhance your spiritual experience",
      icon: Music,
      href: "/worship",
      color: "secondary" as const,
    },
    {
      title: "Books",
      description: "Enlightening Christian literature to deepen your understanding",
      icon: Book,
      href: "/books",
      color: "tertiary" as const,
    },
    {
      title: "Movies",
      description: "Visual content including testimonies, teachings, and inspirational stories",
      icon: Video,
      href: "/movies",
      color: "quaternary" as const,
    },
  ]

  // Get featured resources (first 3 from each category)
  const featuredSermons = getResourcesByCategory("sermons").slice(0, 3)
  const featuredWorship = getResourcesByCategory("worship").slice(0, 3)
  const featuredBooks = getResourcesByCategory("books").slice(0, 3)
  const featuredMovies = getResourcesByCategory("movies").slice(0, 3)

  return (
    <>
      <HeroSection />

      <section id="categories" className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Explore Our Resources</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                icon={category.icon}
                href={category.href}
                color={category.color}
              />
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-12 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </section>

      <section className="py-16 wave-pattern relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Nurture Your Faith Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            Our carefully curated resources are designed to help you grow in your spiritual walk. Discover content that
            inspires, educates, and strengthens your relationship with God.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2 gradient-text">100+</div>
              <div className="text-muted-foreground">Sermons</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-secondary/20">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-muted-foreground">Worship Resources</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-tertiary/20">
              <div className="text-4xl font-bold text-tertiary mb-2">75+</div>
              <div className="text-muted-foreground">Books</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-quaternary/20">
              <div className="text-4xl font-bold text-quaternary mb-2">60+</div>
              <div className="text-muted-foreground">Movies</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Featured Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore some of our most popular resources from each category
            </p>
          </div>

          <div className="space-y-16">
            {/* Featured Sermons */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Featured Sermons</h3>
                <Button variant="ghost" asChild className="text-primary">
                  <Link href="/sermons" className="flex items-center gap-2">
                    View All <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredSermons.map((sermon) => (
                  <ResourceCard
                    key={sermon.id}
                    title={sermon.title}
                    description={sermon.description}
                    imageUrl={sermon.imageUrl}
                    externalLink={sermon.externalLink}
                    category="sermons"
                  />
                ))}
              </div>
            </div>

            {/* Featured Worship */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Featured Worship</h3>
                <Button variant="ghost" asChild className="text-secondary">
                  <Link href="/worship" className="flex items-center gap-2">
                    View All <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredWorship.map((worship) => (
                  <ResourceCard
                    key={worship.id}
                    title={worship.title}
                    description={worship.description}
                    imageUrl={worship.imageUrl}
                    externalLink={worship.externalLink}
                    category="worship"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 cross-pattern">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Join Our Community</h2>
              <p className="text-muted-foreground">
                Connect with fellow believers and stay updated with the latest resources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-lg bg-primary/10">
                <h3 className="text-xl font-bold mb-2">Weekly Updates</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get notified about new resources and spiritual insights
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Subscribe
                </Button>
              </div>

              <div className="p-6 rounded-lg bg-secondary/10">
                <h3 className="text-xl font-bold mb-2">Prayer Requests</h3>
                <p className="text-sm text-muted-foreground mb-4">Share your prayer needs with our community</p>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  Submit Request
                </Button>
              </div>

              <div className="p-6 rounded-lg bg-tertiary/10">
                <h3 className="text-xl font-bold mb-2">Recommend</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help us curate and share quality Christian resources
                </p>
                <Button variant="outline" className="border-tertiary text-tertiary hover:bg-tertiary/10">
                  Join Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

