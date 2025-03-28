export interface Resource {
  id: string
  title: string
  description: string
  imageUrl: string
  externalLink: string
  category: "sermons" | "worship" | "books" | "movies"
}

// Mock data for the application
export const resources: Resource[] = [
  // Sermons
  {
    id: "sermon-1",
    title: "The Power of Faith",
    description:
      "Discover how faith can move mountains in your life. This inspiring sermon explores the biblical foundations of faith and provides practical guidance for strengthening your belief.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/sermon1",
    category: "sermons",
  },
  {
    id: "sermon-2",
    title: "Walking in God's Purpose",
    description:
      "Learn how to discern and fulfill God's unique purpose for your life. This message will help you align your goals with divine guidance.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/sermon2",
    category: "sermons",
  },
  {
    id: "sermon-3",
    title: "Overcoming Life's Challenges",
    description:
      "Biblical strategies for facing and conquering the obstacles in your path. This sermon provides spiritual tools for resilience and victory.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/sermon3",
    category: "sermons",
  },
  {
    id: "sermon-4",
    title: "The Grace of God",
    description:
      "Explore the transformative power of God's grace and how it operates in our daily lives. This message will deepen your understanding of divine favor.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/sermon4",
    category: "sermons",
  },
  {
    id: "sermon-5",
    title: "Building Strong Relationships",
    description:
      "Biblical principles for creating and maintaining healthy relationships in all areas of life. This sermon offers practical wisdom for connection and community.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/sermon5",
    category: "sermons",
  },
  {
    id: "sermon-6",
    title: "The Heart of Worship",
    description:
      "Understanding what true worship means beyond music and rituals. This message explores worship as a lifestyle and spiritual discipline.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/sermon6",
    category: "sermons",
  },

  // Worship
  {
    id: "worship-1",
    title: "Hillsong Worship Collection",
    description:
      "A curated collection of powerful worship songs from Hillsong that will elevate your personal and corporate worship experience.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/worship1",
    category: "worship",
  },
  {
    id: "worship-2",
    title: "Bethel Music Essentials",
    description:
      "Experience the anointed worship of Bethel Music with this essential collection of their most impactful songs and resources.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/worship2",
    category: "worship",
  },
  {
    id: "worship-3",
    title: "Elevation Worship Anthology",
    description:
      "Powerful worship resources from Elevation Worship, designed to inspire and facilitate meaningful encounters with God.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/worship3",
    category: "worship",
  },
  {
    id: "worship-4",
    title: "Worship Leader's Toolkit",
    description:
      "Comprehensive resources for worship leaders including chord charts, tutorials, and planning guides for effective ministry.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/worship4",
    category: "worship",
  },
  {
    id: "worship-5",
    title: "Acoustic Worship Sessions",
    description:
      "Intimate acoustic worship arrangements perfect for personal devotion or small group settings. Includes video tutorials and chord sheets.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/worship5",
    category: "worship",
  },
  {
    id: "worship-6",
    title: "Prophetic Worship Guide",
    description:
      "Learn the principles and practice of prophetic worship with this comprehensive guide for musicians and worship teams.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/worship6",
    category: "worship",
  },

  // Books
  {
    id: "book-1",
    title: "Purpose Driven Life",
    description:
      "Rick Warren's life-changing bestseller that helps you understand why you are alive and reveals God's amazing plan for you both here and in eternity.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/book1",
    category: "books",
  },
  {
    id: "book-2",
    title: "Mere Christianity",
    description:
      "C.S. Lewis's masterful defense of the Christian faith that brings together Lewis's legendary broadcast talks during World War II.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/book2",
    category: "books",
  },
  {
    id: "book-3",
    title: "Battlefield of the Mind",
    description:
      "Joyce Meyer's bestseller that shows you how to win the battle for your mind and find peace and happiness in your everyday life.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/book3",
    category: "books",
  },
  {
    id: "book-4",
    title: "The Case for Christ",
    description:
      "Lee Strobel's investigation of the evidence for Jesus, written by a former atheist and award-winning legal journalist.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/book4",
    category: "books",
  },
  {
    id: "book-5",
    title: "Crazy Love",
    description:
      "Francis Chan's call to pursue a passionate, authentic relationship with God that results in a life of compassion and service.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/book5",
    category: "books",
  },
  {
    id: "book-6",
    title: "The 5 Love Languages",
    description:
      "Gary Chapman's guide to expressing heartfelt commitment to your mate through understanding the five love languages.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/book6",
    category: "books",
  },

  // Movies
  {
    id: "video-1",
    title: "The Bible Project: Overview Series",
    description:
      "Beautifully animated movies that walk through the narrative of the Bible, explaining the connections between all the books and themes.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/video1",
    category: "movies",
  },
  {
    id: "video-2",
    title: "Testimony: Finding Faith in Difficult Times",
    description:
      "Powerful testimonies of individuals who found and maintained their faith during challenging life circumstances.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/video2",
    category: "movies",
  },
  {
    id: "video-3",
    title: "Biblical History Documentary Series",
    description:
      "An in-depth exploration of biblical history, archaeology, and cultural context that brings Scripture to life.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/video3",
    category: "movies",
  },
  {
    id: "video-4",
    title: "Christian Family Values Workshop",
    description:
      "Video series on building strong Christian families with practical advice for parents, couples, and individuals.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/video4",
    category: "movies",
  },
  {
    id: "video-5",
    title: "Apologetics Masterclass",
    description:
      "Learn how to defend your faith with confidence through this comprehensive video series on Christian apologetics.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/video5",
    category: "movies",
  },
  {
    id: "video-6",
    title: "Worship Experience: Live Recording",
    description: "Experience the power of corporate worship with this live recording from a global worship conference.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    externalLink: "https://example.com/video6",
    category: "movies",
  },
]

// Helper function to get resources by category
export function getResourcesByCategory(category: Resource["category"]) {
  return resources.filter((resource) => resource.category === category)
}

// Helper function to get a resource by ID
export function getResourceById(id: string) {
  return resources.find((resource) => resource.id === id)
}

