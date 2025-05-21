import type React from "react";
import { getFeaturedResources } from "@/lib/api";
import type { Resource } from "@/lib/api";
import HeroSection from "@/components/hero-section";
import { AnimatedSections } from "@/components/animated-sections";

export default async function Home() {
  const categories = [
    {
      title: "Sermons",
      description:
        "Inspiring messages from renowned preachers to strengthen your faith",
      iconName: "FileText",
      href: "/sermon",
      color: "primary" as const,
    },
    {
      title: "Worship",
      description:
        "Uplifting worship music and resources to enhance your spiritual experience",
      iconName: "Music",
      href: "/worship",
      color: "secondary" as const,
    },
    {
      title: "Books",
      description:
        "Enlightening Christian literature to deepen your understanding",
      iconName: "Book",
      href: "/book",
      color: "tertiary" as const,
    },
    {
      title: "Movies",
      description:
        "Visual content including testimonies, teachings, and inspirational stories",
      iconName: "Video",
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
    error =
      e instanceof Error ? e.message : "Failed to load featured resources";
    console.error("Error loading featured resources:", e);
  }

  return (
    <main>
      <HeroSection />
      <AnimatedSections
        categories={categories}
        featuredResources={featuredResources}
        error={error}
      />
    </main>
  );
}
