import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/types/news";
import NewsCard from "./NewsCard";

interface NewsCarouselProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

const NewsCarousel = ({ articles, onArticleClick }: NewsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredArticles = articles.slice(0, 5); // Show first 5 articles

  useEffect(() => {
    if (featuredArticles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredArticles.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
  };

  if (featuredArticles.length === 0) return null;

  return (
    <div className="relative w-full bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold font-heading mb-2">Featured Stories</h2>
          <div className="h-1 w-20 bg-gradient-accent rounded-full"></div>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl">
          {/* Carousel Container */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredArticles.map((article, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="h-96 relative">
                  <img
                    src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop'}
                    alt={article.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop';
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-3xl">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-news-accent text-white text-sm font-medium rounded-full">
                          {article.source.name}
                        </span>
                      </div>
                      <h3 
                        className="text-2xl lg:text-4xl font-bold font-heading mb-4 cursor-pointer hover:text-news-accent transition-colors"
                        onClick={() => onArticleClick(article)}
                      >
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-lg text-gray-200 line-clamp-2 mb-4">
                          {article.description}
                        </p>
                      )}
                      <Button 
                        onClick={() => onArticleClick(article)}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                      >
                        Read Full Story
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white border border-white/30"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white border border-white/30"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/75'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;