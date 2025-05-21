"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 flex items-center justify-center bg-primary/20 dark:bg-primary/10 rounded-full">
              <Sun className="h-6 w-6 text-primary" />
              <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 rounded-full animate-pulse-slow"></div>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold gradient-text">
                Dunamis
              </span>
              <span className="text-lg font-medium ml-1 dark:text-gray-100">
                Faith Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/5 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              href="/sermon"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/5 rounded-md transition-colors"
            >
              Sermons
            </Link>
            <Link
              href="/worship"
              className="px-4 py-2 text-foreground hover:text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/5 rounded-md transition-colors"
            >
              Worship
            </Link>
            <Link
              href="/book"
              className="px-4 py-2 text-foreground hover:text-tertiary hover:bg-tertiary/10 dark:hover:bg-tertiary/5 rounded-md transition-colors"
            >
              Books
            </Link>
            <Link
              href="/movie"
              className="px-4 py-2 text-foreground hover:text-quaternary hover:bg-quaternary/10 dark:hover:bg-quaternary/5 rounded-md transition-colors"
            >
              Movies
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-1">
            <Link
              href="/"
              className="block py-2 px-4 text-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/sermon"
              className="block py-2 px-4 text-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sermons
            </Link>
            <Link
              href="/worship"
              className="block py-2 px-4 text-foreground hover:text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Worship
            </Link>
            <Link
              href="/book"
              className="block py-2 px-4 text-foreground hover:text-tertiary hover:bg-tertiary/10 dark:hover:bg-tertiary/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              href="/movie"
              className="block py-2 px-4 text-foreground hover:text-quaternary hover:bg-quaternary/10 dark:hover:bg-quaternary/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
