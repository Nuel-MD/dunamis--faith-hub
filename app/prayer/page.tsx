"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PrayerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Prayer Support
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">
            Submit Your Prayer Request
          </h1>
          <p className="text-lg text-muted-foreground mb-12 text-center">
            Share your prayer needs with our community. We believe in the power
            of collective prayer and support.
          </p>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="request"
                  className="block text-sm font-medium mb-2"
                >
                  Prayer Request
                </label>
                <textarea
                  id="request"
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  placeholder="Share your prayer request..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prayer Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Personal</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Family</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Health</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Spiritual</span>
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full gradient-button">
                Submit Prayer Request
              </Button>
            </form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Your prayer request will be shared with our prayer team and
              community
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
