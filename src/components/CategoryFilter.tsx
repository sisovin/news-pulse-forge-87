import { Button } from "@/components/ui/button";
import { NewsCategory } from "@/types/news";
import { 
  Globe, 
  Briefcase, 
  Activity, 
  Zap, 
  Gamepad2, 
  Heart, 
  Cpu 
} from "lucide-react";

interface CategoryFilterProps {
  categories: NewsCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  general: <Globe className="h-4 w-4" />,
  business: <Briefcase className="h-4 w-4" />,
  sports: <Activity className="h-4 w-4" />,
  entertainment: <Zap className="h-4 w-4" />,
  gaming: <Gamepad2 className="h-4 w-4" />,
  health: <Heart className="h-4 w-4" />,
  technology: <Cpu className="h-4 w-4" />,
};

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="w-full bg-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex items-center space-x-2 whitespace-nowrap transition-all
                ${activeCategory === category.id 
                  ? 'bg-news-primary text-white shadow-hero' 
                  : 'hover:bg-secondary'
                }
              `}
            >
              {categoryIcons[category.id]}
              <span className="font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;