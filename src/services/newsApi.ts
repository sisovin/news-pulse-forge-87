import { NewsResponse } from "@/types/news";

const NEWS_API_BASE_URL = "https://newsapi.org/v2";

// For demo purposes, we'll use mock data since NewsAPI requires a key
// In a real app, you'd add your NewsAPI key here
export const fetchTopHeadlines = async (category?: string, country: string = "us"): Promise<NewsResponse> => {
  // Mock data for demonstration
  const mockArticles = [
    {
      source: { id: "bbc-news", name: "BBC News" },
      author: "BBC Newsroom",
      title: "Breaking: Major Tech Conference Announces Revolutionary AI Breakthrough",
      description: "Industry leaders gather to unveil groundbreaking artificial intelligence technology that could reshape the future of computing and human interaction.",
      url: "https://bbc.com/news/technology",
      urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      content: "The tech industry is buzzing with excitement as major companies unveil their latest AI innovations. These breakthroughs promise to revolutionize how we interact with technology in our daily lives..."
    },
    {
      source: { id: "techcrunch", name: "TechCrunch" },
      author: "Sarah Johnson",
      title: "Startup Secures $50M in Series B Funding for Climate Tech Innovation",
      description: "The promising climate technology startup has raised significant funding to accelerate development of their carbon capture solutions.",
      url: "https://techcrunch.com/startup-funding",
      urlToImage: "https://images.unsplash.com/photo-1497436072909-f5e4be634ea6?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      content: "In a significant move for the climate tech sector, the innovative startup has successfully closed a $50 million Series B funding round..."
    },
    {
      source: { id: "reuters", name: "Reuters" },
      author: "Michael Chen",
      title: "Global Markets Show Strong Recovery Amid Economic Optimism",
      description: "Stock markets worldwide are experiencing a robust upturn as investors show renewed confidence in economic recovery prospects.",
      url: "https://reuters.com/markets",
      urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      content: "Financial markets across the globe are showing strong signs of recovery as economic indicators point to sustained growth..."
    },
    {
      source: { id: "espn", name: "ESPN" },
      author: "Sports Desk",
      title: "Championship Final Set as Teams Advance in Thrilling Semi-Finals",
      description: "Two powerhouse teams have secured their spots in the championship final after delivering spectacular performances in yesterday's semi-final matches.",
      url: "https://espn.com/sports",
      urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
      content: "The stage is set for an epic championship final as both teams demonstrated exceptional skill and determination..."
    },
    {
      source: { id: "health-news", name: "Health News Today" },
      author: "Dr. Emma Wilson",
      title: "New Study Reveals Promising Results for Cancer Treatment",
      description: "Researchers have published groundbreaking findings that could lead to more effective and less invasive cancer treatment options.",
      url: "https://healthnews.com/cancer-research",
      urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 1000 * 60 * 270).toISOString(),
      content: "A comprehensive study involving leading medical institutions has yielded promising results in the fight against cancer..."
    },
    {
      source: { id: "entertainment-weekly", name: "Entertainment Weekly" },
      author: "Celebrity Reporter",
      title: "Award Season Kicks Off with Star-Studded Ceremony",
      description: "Hollywood's biggest names gathered for the opening ceremony of award season, setting the stage for an exciting month of recognition and celebration.",
      url: "https://ew.com/awards",
      urlToImage: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 1000 * 60 * 330).toISOString(),
      content: "The entertainment industry came together for a glittering ceremony that marked the beginning of award season..."
    }
  ];

  // Filter by category if provided
  const filteredArticles = category && category !== 'general' 
    ? mockArticles.filter((_, index) => {
        // Simple category mapping for demo
        const categoryMap: Record<string, number[]> = {
          business: [1, 2],
          sports: [3],
          health: [4],
          entertainment: [5],
          technology: [0]
        };
        return categoryMap[category]?.includes(index) ?? false;
      })
    : mockArticles;

  return {
    status: "ok",
    totalResults: filteredArticles.length,
    articles: filteredArticles
  };
};

export const searchNews = async (query: string): Promise<NewsResponse> => {
  // Mock search results
  const searchResults = [
    {
      source: { id: "search-result", name: "News Source" },
      author: "Reporter Name",
      title: `Search results for: ${query}`,
      description: `Latest news and updates related to your search query: ${query}`,
      url: "https://example.com/search",
      urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop",
      publishedAt: new Date().toISOString(),
      content: `Here are the latest developments and news stories related to ${query}...`
    }
  ];

  return {
    status: "ok",
    totalResults: searchResults.length,
    articles: searchResults
  };
};