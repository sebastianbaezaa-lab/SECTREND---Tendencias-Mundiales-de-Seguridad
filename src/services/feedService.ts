import { Trend } from '../types';

const FEEDS = [
  { url: "https://feeds.feedburner.com/TheHackersNews", category: "News" },
  { url: "https://www.cisa.gov/cybersecurity-advisories/all.xml", category: "Vulnerability" },
];

export async function fetchLiveFeedsFrontend(): Promise<Trend[]> {
  try {
    const fetchedTrends: Trend[] = [];
    let idCounter = 1;

    for (const feed of FEEDS) {
      try {
        // Utilizamos rss2json para saltarnos los problemas de CORS cuando
        // la aplicación está desplegada en Vercel como sitio web estático.
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) continue;
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
          data.items.forEach((item: any) => {
            const title = item.title?.toLowerCase() || '';
            const desc = (item.description || item.content || '').toLowerCase();
            const text = title + " " + desc;
            
            let severity: 'Critical' | 'High' | 'Medium' | 'Low' = 'Medium';
            if (text.includes('critical') || text.includes('zero-day') || text.includes('0-day')) severity = 'Critical';
            else if (text.includes('high') || text.includes('breach') || text.includes('ransomware')) severity = 'High';
            else if (text.includes('low')) severity = 'Low';

            let category: any = feed.category;
            if (text.includes('cve-')) category = 'CVE';
            else if (text.includes('breach') || text.includes('leak')) category = 'Data Breach';
            else if (text.includes('malware') || text.includes('ransomware') || text.includes('botnet')) category = 'Malware';
            else if (text.includes('zero-day') || text.includes('0-day')) category = 'Zero-Day';

            fetchedTrends.push({
              id: `AUTO-CLIENT-${Math.floor(Math.random() * 100000)}-${idCounter++}`,
              title: item.title || 'Untitled Threat',
              description: item.description ? item.description.replace(/<[^>]+>/g, '').substring(0, 150) + '...' : 'No description available',
              longDescription: item.description || item.content || 'Detailed information is not available.',
              category: category,
              severity: severity,
              dateDiscovered: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
              affectedSystems: ['Various Systems'],
              mentions: Math.floor(Math.random() * 5000) + 100,
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
        }
      } catch (err) {
        console.error("Error fetching feed frontend:", feed.url, err);
      }
    }

    return fetchedTrends.sort((a, b) => new Date(b.dateDiscovered).getTime() - new Date(a.dateDiscovered).getTime());
  } catch (error) {
    console.error("Failed to fetch feeds via API:", error);
    return [];
  }
}
