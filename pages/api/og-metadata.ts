import type { NextApiRequest, NextApiResponse } from "next"
import * as cheerio from "cheerio"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query
  if (!url || typeof url !== "string") return res.status(400).json({ error: "Missing URL" })

  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)

    const getMeta = (name: string) =>
      $(`meta[property='${name}']`).attr("content") || $(`meta[name='${name}']`).attr("content")

    const title = getMeta("og:title")
    const description = getMeta("og:description")
    const image = getMeta("og:image")

    res.status(200).json({ title, description, image })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metadata" })
  }
}
