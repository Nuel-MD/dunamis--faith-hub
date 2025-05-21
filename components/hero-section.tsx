"use client";

import { Button } from "@/components/ui/button";
import { Book, Music, Video, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Welcome to Dunamis Faith Hub
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight"
          >
            Discover Inspiring Christian Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Access sermons, worship music, books, and movies to strengthen your
            faith journey
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="gradient-button text-lg px-8 py-6"
              asChild
            >
              <a href="#categories">Explore Resources</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
            >
              <a href="/about">Learn More</a>
            </Button>
          </motion.div>
        </div>

        {/* Enhanced Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            {
              Icon: Book,
              delay: 0,
              position: "top-1/4 left-1/4",
              size: "w-16 h-16",
            },
            {
              Icon: Music,
              delay: 0.2,
              position: "top-1/3 right-1/4",
              size: "w-20 h-20",
            },
            {
              Icon: Video,
              delay: 0.4,
              position: "bottom-1/4 left-1/3",
              size: "w-16 h-16",
            },
            {
              Icon: FileText,
              delay: 0.6,
              position: "bottom-1/3 right-1/3",
              size: "w-20 h-20",
            },
          ].map(({ Icon, delay, position, size }) => (
            <motion.div
              key={position}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay }}
              className={`absolute ${position} text-primary/20 ${size}`}
            >
              <Icon className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-primary/20 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-secondary/20 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-tertiary/20 to-transparent"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
