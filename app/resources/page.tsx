"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Music, Book, Video } from "lucide-react";

export default function ResourcesPage() {
  const categories = [
    {
      title: "Sermons",
      description:
        "Inspiring messages from renowned preachers to strengthen your faith",
      icon: FileText,
      href: "/sermon",
      color: "primary",
    },
    {
      title: "Worship",
      description:
        "Uplifting worship music and resources to enhance your spiritual experience",
      icon: Music,
      href: "/worship",
      color: "secondary",
    },
    {
      title: "Books",
      description:
        "Enlightening Christian literature to deepen your understanding",
      icon: Book,
      href: "/book",
      color: "tertiary",
    },
    {
      title: "Movies",
      description:
        "Visual content including testimonies, teachings, and inspirational stories",
      icon: Video,
      href: "/movie",
      color: "quaternary",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            All Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">
            Explore Our Resources
          </h1>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Discover our comprehensive collection of Christian resources
            designed to nurture your spiritual growth
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-${category.color}/20 hover:shadow-xl transition-shadow`}
                >
                  <div className={`text-${category.color} mb-4`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <Button
                    variant="outline"
                    className={`border-${category.color} text-${category.color} hover:bg-${category.color}/10`}
                    asChild
                  >
                    <a href={category.href}>Explore {category.title}</a>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              We're constantly adding new resources to our collection. If you
              have a specific request or recommendation, we'd love to hear from
              you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-button" asChild>
                <a href="/contribute">Suggest a Resource</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
