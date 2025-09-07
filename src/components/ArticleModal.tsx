import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewsArticle } from "@/types/news";
import { ExternalLink, Clock, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {
  if (!article) return null;

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  const handleReadMore = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          {/* Image */}
          {article.urlToImage && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop';
                }}
              />
            </div>
          )}
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{article.source.name}</Badge>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{timeAgo}</span>
            </div>
            {article.author && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{article.author}</span>
              </div>
            )}
          </div>
          
          {/* Title */}
          <DialogTitle className="text-2xl font-heading font-bold leading-tight">
            {article.title}
          </DialogTitle>
        </DialogHeader>
        
        {/* Description */}
        {article.description && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.description}
          </p>
        )}
        
        {/* Content */}
        {article.content && (
          <div className="prose prose-gray max-w-none">
            <p className="leading-relaxed">
              {article.content.replace(/\[\+\d+ chars\]/g, '...')}
            </p>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleReadMore} className="flex items-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span>Read Full Article</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;