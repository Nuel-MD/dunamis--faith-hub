export const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/
    const match = url.match(regex)
    return match ? match[1] : null
  }
  
  export const getMetadataFromLink = async (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = extractYouTubeId(url)
      if (!videoId) return null
  
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`,
      )
      const data = await response.json()
      const snippet = data.items?.[0]?.snippet
  
      if (snippet) {
        return {
          title: snippet.title,
          description: snippet.description,
          imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        }
      }
    }
  
    if (url.includes("spotify.com")) {
      // Example: Fetch Open Graph meta tags
      const res = await fetch(`/api/og-metadata?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      return {
        title: data.title || "Spotify Track",
        description: data.description || "Track from Spotify",
        imageUrl: data.image || "/placeholder.svg",
      }
    }
  
    if (url.includes("christianbook") || url.includes("books") || url.includes("pdf")) {
      // Same idea: just grab Open Graph metadata
      const res = await fetch(`/api/og-metadata?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      return {
        title: data.title || "Christian Book",
        description: data.description || "Online Book",
        imageUrl: data.image || "/placeholder.svg",
      }
    }
  
    return null
  }
  