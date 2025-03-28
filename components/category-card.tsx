import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: "primary" | "secondary" | "tertiary" | "quaternary"
}

export default function CategoryCard({ title, description, icon: Icon, href, color }: CategoryCardProps) {
  const colorClasses = {
    primary: {
      bg: "gradient-bg",
      icon: "bg-primary/20 text-primary",
      hover: "hover:border-primary/50",
    },
    secondary: {
      bg: "gradient-bg-blue",
      icon: "bg-secondary/20 text-secondary",
      hover: "hover:border-secondary/50",
    },
    tertiary: {
      bg: "gradient-bg-purple",
      icon: "bg-tertiary/20 text-tertiary",
      hover: "hover:border-tertiary/50",
    },
    quaternary: {
      bg: "gradient-bg-green",
      icon: "bg-quaternary/20 text-quaternary",
      hover: "hover:border-quaternary/50",
    },
  }

  return (
    <Link href={href} className="block group">
      <Card
        className={`h-full transition-all duration-300 hover:shadow-lg ${colorClasses[color].hover} overflow-hidden border-2`}
      >
        <CardContent className={`p-6 flex flex-col items-center text-center ${colorClasses[color].bg}`}>
          <div
            className={`mb-4 p-4 rounded-full ${colorClasses[color].icon} transform transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon size={36} />
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

