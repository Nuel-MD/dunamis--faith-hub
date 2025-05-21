"use client";

import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
}

export default function CategoryCard({ title, description, icon: Icon, href, color }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`block p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow ${
        color === "primary"
          ? "hover:border-primary"
          : color === "secondary"
          ? "hover:border-secondary"
          : color === "tertiary"
          ? "hover:border-tertiary"
          : "hover:border-quaternary"
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`p-2 rounded-lg ${
            color === "primary"
              ? "bg-primary/10 text-primary"
              : color === "secondary"
              ? "bg-secondary/10 text-secondary"
              : color === "tertiary"
              ? "bg-tertiary/10 text-tertiary"
              : "bg-quaternary/10 text-quaternary"
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  )
}

