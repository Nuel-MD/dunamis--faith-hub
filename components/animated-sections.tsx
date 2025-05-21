"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/category-card";
import ResourceCard from "@/components/resource-card";
import type { Resource } from "@/lib/api";
import { FileText, Music, Book, Video } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface AnimatedSectionsProps {
  categories: Array<{
    title: string;
    description: string;
    iconName: string;
    href: string;
    color: string;
  }>;
  featuredResources: Resource[];
  error: string | null;
}

const iconMap = {
  FileText,
  Music,
  Book,
  Video,
};

export function AnimatedSections({
  categories,
  featuredResources,
  error,
}: AnimatedSectionsProps) {
  return (
    <>
      {/* Categories Section */}
      <section className="py-16 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Explore Resources
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {categories.map((category, index) => {
                const Icon = iconMap[category.iconName as keyof typeof iconMap];
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CategoryCard {...category} icon={Icon} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 wave-pattern relative dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
          >
            Nurture Your Faith Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-sm"
          >
            Our carefully curated resources are designed to help you grow in
            your spiritual walk. Discover content that inspires, educates, and
            strengthens your relationship with God.
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {[
                { value: "100+", label: "Sermons", color: "primary" },
                {
                  value: "50+",
                  label: "Worship Resources",
                  color: "secondary",
                },
                { value: "75+", label: "Books", color: "tertiary" },
                { value: "60+", label: "Movies", color: "quaternary" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-${stat.color}/20`}
                >
                  <div
                    className={`text-4xl font-bold text-${stat.color} mb-2 ${
                      stat.color === "primary" ? "gradient-text" : ""
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Featured Content
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Featured Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of inspiring Christian content
              to enrich your spiritual journey
            </p>
          </motion.div>

          {error ? (
            <div className="text-center text-red-600">
              <p>{error}</p>
              <p className="mt-2">Please try again later.</p>
            </div>
          ) : featuredResources.length > 0 ? (
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {featuredResources.map((resource, index) => (
                    <CarouselItem
                      key={resource.id}
                      className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full"
                      >
                        <ResourceCard
                          title={resource.title}
                          description={resource.description}
                          imageUrl={resource.imageUrl}
                          externalLink={resource.externalLink}
                          category={resource.category}
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-6 md:hidden">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10" />
                  <CarouselNext className="static translate-y-0 h-10 w-10" />
                </div>
                <div className="hidden md:block">
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </div>
              </Carousel>
              <div className="text-center mt-4 text-sm text-muted-foreground md:hidden">
                Swipe to explore more resources
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>No featured resources available at the moment.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Button size="lg" className="gradient-button" asChild>
              <a href="/resources">View All Resources</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 cross-pattern dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Join Our Community
              </h2>
              <p className="text-muted-foreground">
                Connect with fellow believers and stay updated with the latest
                resources
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <AnimatePresence>
                {[
                  {
                    title: "Weekly Updates",
                    description:
                      "Get notified about new resources and spiritual insights",
                    color: "primary",
                    link: "/subscribe",
                    linkText: "Subscribe",
                  },
                  {
                    title: "Prayer Requests",
                    description: "Share your prayer needs with our community",
                    color: "secondary",
                    link: "/prayer",
                    linkText: "Submit Request",
                  },
                  {
                    title: "Recommend",
                    description:
                      "Help us curate and share quality Christian resources",
                    color: "tertiary",
                    link: "/contribute",
                    linkText: "Join Us",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6 rounded-lg bg-${item.color}/10 dark:bg-${item.color}/5`}
                  >
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Button
                      variant="outline"
                      className={`border-${item.color} text-${item.color} hover:bg-${item.color}/10`}
                      asChild
                    >
                      <a href={item.link}>{item.linkText}</a>
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
