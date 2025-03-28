import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Music, Video, FileText } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden hero-pattern">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
            <span className="text-primary font-medium">Nurturing Faith Through Resources</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight gradient-text">
            Welcome to Your Faith Resource Hub
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            Discover a wealth of Christian content to nurture your spiritual journey. Explore sermons, worship
            materials, books, and movies all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="relative overflow-hidden group">
              <Link href="#categories" className="flex items-center gap-2">
                <span className="relative z-10">Explore Resources</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:opacity-90 transition-opacity"></span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-2 hover:bg-primary/10">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 left-[10%] w-12 h-12 text-primary/40 animate-float">
        <BookOpen size={48} />
      </div>
      <div
        className="absolute top-40 right-[15%] w-12 h-12 text-secondary/40 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Music size={48} />
      </div>
      <div
        className="absolute bottom-20 left-[20%] w-12 h-12 text-tertiary/40 animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        <Video size={48} />
      </div>
      <div
        className="absolute bottom-40 right-[10%] w-12 h-12 text-quaternary/40 animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <FileText size={48} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-tertiary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      </div>

      {/* Light rays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 shine"></div>
    </section>
  )
}

