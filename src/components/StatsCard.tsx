import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  description?: string;
  highlight?: boolean;
}

export const StatsCard = ({ 
  title, 
  value, 
  unit = "mg", 
  trend, 
  trendValue,
  description,
  highlight = false
}: StatsCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-destructive" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-success" />;
      case 'neutral': return <Minus className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getValueColor = () => {
    if (value < 100) return 'text-success';
    if (value < 200) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className={`p-6 ${highlight ? 'border-primary shadow-md' : ''}`}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className={`text-3xl font-bold ${getValueColor()}`}>
            {value.toFixed(1)}
          </h3>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        {(trend || description) && (
          <div className="flex items-center gap-2 text-sm">
            {trend && (
              <>
                {getTrendIcon()}
                <span className="text-muted-foreground">{trendValue}</span>
              </>
            )}
            {description && !trend && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
