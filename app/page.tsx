import type React from "react";
import { FileText, Music, Book, Video } from "lucide-react";
import CategoryCard from "@/components/category-card";
import ResourceCard from "@/components/resource-card";
import { getFeaturedResources } from "@/lib/api";
import type { Resource } from "@/lib/api";
import HeroSection from "@/components/hero-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Loading state component
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

export default async function Home() {
  const categories = [
    {
      title: "Sermons",
      description: "Inspiring messages from renowned preachers to strengthen your faith",
      icon: FileText,
      href: "/sermon",
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
      href: "/book",
      color: "tertiary" as const,
    },
    {
      title: "Movies",
      description: "Visual content including testimonies, teachings, and inspirational stories",
      icon: Video,
      href: "/movie",
      color: "quaternary" as const,
    },
  ];

  // Fetch featured resources (no authentication needed)
  let featuredResources: Resource[] = [];
  let error: string | null = null;

  try {
    featuredResources = await getFeaturedResources();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load featured resources";
    console.error("Error loading featured resources:", e);
  }

  return (
    <main>
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 wave-pattern relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Nurture Your Faith Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            Our carefully curated resources are designed to help you grow in your spiritual walk. Discover content that inspires, educates, and strengthens your relationship with God.
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

      {/* Featured Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Resources</h2>
          {error ? (
            <div className="text-center text-red-600">
              <p>{error}</p>
              <p className="mt-2">Please try again later.</p>
            </div>
          ) : featuredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
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
          ) : (
            <div className="text-center text-muted-foreground">
              <p>No featured resources available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 cross-pattern">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Join Our Community
              </h2>
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
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                  <a href="/subscribe">Subscribe</a>
                </Button>
              </div>
              <div className="p-6 rounded-lg bg-secondary/10">
                <h3 className="text-xl font-bold mb-2">Prayer Requests</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Share your prayer needs with our community
                </p>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10" asChild>
                  <a href="/prayer">Submit Request</a>
                </Button>
              </div>
              <div className="p-6 rounded-lg bg-tertiary/10">
                <h3 className="text-xl font-bold mb-2">Recommend</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help us curate and share quality Christian resources
                </p>
                <Button variant="outline" className="border-tertiary text-tertiary hover:bg-tertiary/10" asChild>
                  <a href="/contribute">Join Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}