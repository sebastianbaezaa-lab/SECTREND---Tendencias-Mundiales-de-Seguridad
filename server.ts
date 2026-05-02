import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Parser from "rss-parser";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const parser = new Parser();

// Base mock trends as a starting point
let globalTrends: any[] = [];
let lastFetch = 0;

const FEEDS = [
  { url: "https://feeds.feedburner.com/TheHackersNews", category: "News" },
  { url: "https://www.cisa.gov/cybersecurity-advisories/all.xml", category: "Vulnerability" },
];

async function fetchFeeds() {
  const now = Date.now();
  // Only fetch every 15 minutes to avoid rate limiting
  if (now - lastFetch < 15 * 60 * 1000 && globalTrends.length > 0) {
    return globalTrends;
  }

  try {
    const fetchedTrends: any[] = [];
    let idCounter = 1;

    for (const feed of FEEDS) {
      try {
        const parsed = await parser.parseURL(feed.url);
        parsed.items.forEach(item => {
          // Determine severity based on words
          const title = item.title?.toLowerCase() || '';
          const desc = item.contentSnippet?.toLowerCase() || '';
          const text = title + " " + desc;
          
          let severity = 'Medium';
          if (text.includes('critical') || text.includes('zero-day') || text.includes('0-day')) severity = 'Critical';
          else if (text.includes('high') || text.includes('breach') || text.includes('ransomware')) severity = 'High';
          else if (text.includes('low')) severity = 'Low';

          let category = feed.category;
          if (text.includes('cve-')) category = 'CVE';
          else if (text.includes('breach') || text.includes('leak')) category = 'Data Breach';
          else if (text.includes('malware') || text.includes('ransomware') || text.includes('botnet')) category = 'Malware';
          else if (text.includes('zero-day') || text.includes('0-day')) category = 'Zero-Day';

          fetchedTrends.push({
            id: `AUTO-${idCounter++}`,
            title: item.title || 'Untitled Threat',
            description: item.contentSnippet ? item.contentSnippet.substring(0, 150) + '...' : 'No description available',
            longDescription: item.contentSnippet || item.content || 'Detailed information is not available.',
            category: category,
            severity: severity,
            dateDiscovered: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
            affectedSystems: ['Various'],
            mentions: Math.floor(Math.random() * 50000), // simulated metric
            timeline: [
              { date: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(), event: "Threat intelligence discovered" }
            ],
            remediation: [
              "Monitor network traffic for anomalous behavior associated with this threat.",
              "Apply relevant security patches as soon as they are available.",
              "Review the full report for specific IoCs and remediation steps."
            ],
            references: [
              { title: "Original Source", url: item.link || '#' }
            ],
            relatedIds: []
          });
        });
      } catch (err) {
        console.error("Error fetching feed:", feed.url, err);
      }
    }

    if (fetchedTrends.length > 0) {
      // Sort by newest first
      globalTrends = fetchedTrends.sort((a, b) => new Date(b.dateDiscovered).getTime() - new Date(a.dateDiscovered).getTime());
      lastFetch = now;
    }
  } catch (err) {
    console.error("General error fetching feeds:", err);
  }

  return globalTrends;
}

// Initial fetch
fetchFeeds().catch(console.error);

async function startServer() {
  app.get("/api/trends", async (req, res) => {
    const trends = await fetchFeeds();
    res.json(trends);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
