import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsArticle } from "@/types/news";
import { Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
  featured?: boolean;
}

const NewsCard = ({ article, onClick, featured = false }: NewsCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
  
  return (
    <Card 
      className={`
        cursor-pointer news-card-hover bg-gradient-card border-0 shadow-card overflow-hidden
        ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}
      `}
      onClick={onClick}
    >
      <div className={`relative ${featured ? 'h-80' : 'h-48'}`}>
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop';
            }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-hero flex items-center justify-center">
            <div className="text-center text-white">
              <ExternalLink className="h-12 w-12 mx-auto mb-2 opacity-60" />
              <p className="text-sm opacity-80">No image available</p>
            </div>
          </div>
        )}
        
        {/* Source Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/70 text-white border-0">
            {article.source.name}
          </Badge>
        </div>
        
        {/* Time Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white border-0 flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{timeAgo}</span>
          </Badge>
        </div>
      </div>
      
      <CardContent className={`p-4 ${featured ? 'p-6' : ''}`}>
        <h3 className={`
          font-heading font-semibold line-clamp-2 mb-2 leading-tight
          ${featured ? 'text-xl lg:text-2xl' : 'text-base'}
        `}>
          {article.title}
        </h3>
        
        {article.description && (
          <p className={`
            text-muted-foreground line-clamp-3 mb-3
            ${featured ? 'text-base' : 'text-sm'}
          `}>
            {article.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{article.author || 'Unknown Author'}</span>
          <div className="flex items-center space-x-1">
            <ExternalLink className="h-3 w-3" />
            <span>Read more</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;