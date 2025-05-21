"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
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
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Welcome to Dunamis Faith Hub
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Dunamis Faith Hub is a comprehensive platform dedicated to
              nurturing spiritual growth through curated Christian resources.
              Our mission is to provide easy access to quality content that
              strengthens faith and builds community.
            </p>

            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground mb-8">
              We envision a world where believers have easy access to inspiring
              Christian content that helps them grow in their faith journey.
              Through our carefully curated collection of sermons, worship
              music, books, and movies, we aim to be a trusted resource for
              spiritual enrichment.
            </p>

            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-muted-foreground">
                  Inspiring sermons from renowned preachers
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-muted-foreground">
                  Uplifting worship music and resources
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-muted-foreground">
                  Enlightening Christian literature
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-muted-foreground">
                  Inspirational movies and visual content
                </span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-8">
              We believe in the power of community and shared faith. Join us in
              our mission to spread God's word and support each other in our
              spiritual journeys.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button size="lg" className="gradient-button" asChild>
                <a href="/resources">Explore Resources</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contribute">Contribute</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
