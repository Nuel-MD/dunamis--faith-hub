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
      className={`h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-2 ${categoryColors[category].border} group`}
    >
      <div className="relative">
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[category].badge} capitalize`}
          >
            {category}
          </span>
        </div>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>
        <p className="text-muted-foreground line-clamp-3 mb-4">{description}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button asChild className={`w-full ${categoryColors[category].button}`}>
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <span>View Resource</span>
            <ExternalLink size={16} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
