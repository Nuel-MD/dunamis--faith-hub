"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Music, Book, Video } from "lucide-react";

export default function ContributePage() {
  const resourceTypes = [
    {
      title: "Sermons",
      description: "Share inspiring messages and teachings",
      icon: FileText,
      color: "primary",
    },
    {
      title: "Worship",
      description: "Contribute worship music and resources",
      icon: Music,
      color: "secondary",
    },
    {
      title: "Books",
      description: "Recommend Christian literature",
      icon: Book,
      color: "tertiary",
    },
    {
      title: "Movies",
      description: "Suggest inspirational visual content",
      icon: Video,
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
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Join Our Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">
            Contribute to Our Community
          </h1>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Help us build a rich collection of Christian resources by sharing
            your recommendations and content
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {resourceTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-${type.color}/20`}
                >
                  <div className={`text-${type.color} mb-4`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {type.description}
                  </p>
                  <Button
                    variant="outline"
                    className={`border-${type.color} text-${type.color} hover:bg-${type.color}/10`}
                  >
                    Submit {type.title}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4 text-center">
              General Contribution
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Have a different type of resource to share? Use our general
              submission form below.
            </p>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Resource Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  placeholder="Enter resource title"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  placeholder="Describe the resource..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium mb-2"
                >
                  Resource Link
                </label>
                <input
                  type="url"
                  id="link"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  placeholder="Enter resource URL"
                  required
                />
              </div>
              <Button type="submit" className="w-full gradient-button">
                Submit Resource
              </Button>
            </form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              All submissions will be reviewed by our team before being added to
              the platform
            </p>
            <Button variant="outline" asChild>
              <a href="/resources">Explore Resources</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
