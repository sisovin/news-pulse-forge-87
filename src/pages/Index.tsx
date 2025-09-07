import { useState, useEffect } from "react";
import { NewsArticle, NewsCategory } from "@/types/news";
import { fetchTopHeadlines, searchNews } from "@/services/newsApi";
import NewsHeader from "@/components/NewsHeader";
import CategoryFilter from "@/components/CategoryFilter";
import NewsCarousel from "@/components/NewsCarousel";
import NewsCard from "@/components/NewsCard";
import ArticleModal from "@/components/ArticleModal";
import { Loader2, AlertCircle, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const categories: NewsCategory[] = [
  { id: "general", name: "All News", icon: "Globe" },
  { id: "business", name: "Business", icon: "Briefcase" },
  { id: "technology", name: "Technology", icon: "Cpu" },
  { id: "sports", name: "Sports", icon: "Activity" },
  { id: "health", name: "Health", icon: "Heart" },
  { id: "entertainment", name: "Entertainment", icon: "Zap" },
];

const Index = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const { toast } = useToast();

  const loadNews = async (category: string = "general") => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTopHeadlines(category === "general" ? undefined : category);
      setArticles(response.articles);
    } catch (err) {
      setError("Failed to load news. Please try again later.");
      toast({
        title: "Error loading news",
        description: "There was a problem fetching the latest news.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await searchNews(searchQuery);
      setArticles(response.articles);
      toast({
        title: "Search completed",
        description: `Found ${response.articles.length} articles for "${searchQuery}"`,
      });
    } catch (err) {
      setError("Failed to search news. Please try again.");
      toast({
        title: "Search failed",
        description: "There was a problem searching for news.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
    loadNews(category);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <NewsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Featured Carousel */}
      {!searchQuery && articles.length > 0 && (
        <NewsCarousel
          articles={articles}
          onArticleClick={setSelectedArticle}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-news-primary" />
              <p className="text-muted-foreground">Loading latest news...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search Results Header */}
        {searchQuery && !loading && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-news-primary" />
              <h2 className="text-2xl font-bold font-heading">
                Search Results for "{searchQuery}"
              </h2>
            </div>
            <p className="text-muted-foreground">
              Found {articles.length} articles
            </p>
          </div>
        )}

        {/* News Grid */}
        {!loading && articles.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-heading">
                {searchQuery ? "Search Results" : "Latest News"}
              </h2>
              <div className="h-1 w-20 bg-gradient-accent rounded-full"></div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {articles.map((article, index) => (
                <div key={index} className="news-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <NewsCard
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `No articles found for "${searchQuery}". Try a different search term.`
                  : "No articles available at the moment. Please try again later."
                }
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};

export default Index;
