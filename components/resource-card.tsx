import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Resource } from "@/lib/api";

interface ResourceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  externalLink: string;
  category: Resource["category"];
}

export default function ResourceCard({
  title,
  description,
  imageUrl,
  externalLink,
  category,
}: ResourceCardProps) {
  const categoryColors = {
    sermon: {
      border: "border-primary/30",
      button: "bg-primary hover:bg-primary/90",
      badge: "bg-primary/20 text-primary",
    },
    worship: {
      border: "border-secondary/30",
      button: "bg-secondary hover:bg-secondary/90",
      badge: "bg-secondary/20 text-secondary",
    },
    book: {
      border: "border-tertiary/30",
      button: "bg-tertiary hover:bg-tertiary/90",
      badge: "bg-tertiary/20 text-tertiary",
    },
    movie: {
      border: "border-quaternary/30",
      button: "bg-quaternary hover:bg-quaternary/90",
      badge: "bg-quaternary/20 text-quaternary",
    },
  };

  return (
    <Card
      className={`h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${categoryColors[category].border} group relative`}
    >
      <div className="relative">
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <span
            className={`text-xs px-2 sm:px-3 py-1 rounded-full font-medium ${categoryColors[category].badge} capitalize backdrop-blur-sm`}
          >
            {category}
          </span>
        </div>
        <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 group-hover:text-foreground/80 transition-colors duration-300">
          {description}
        </p>
      </CardContent>
      <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
        <Button
          asChild
          className={`w-full text-sm sm:text-base ${categoryColors[category].button} group-hover:scale-[1.02] transition-transform duration-300`}
        >
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <span>View Resource</span>
            <ExternalLink
              size={14}
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            />
          </a>
        </Button>
      </CardFooter>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg transition-colors duration-300 pointer-events-none"></div>
    </Card>
  );
}
