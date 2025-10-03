import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FoodEntry } from "@/types/tracking";
import { getPurineLevel } from "@/data/foods";

interface FoodLogProps {
  entries: FoodEntry[];
  onDeleteEntry: (id: string) => void;
}

export const FoodLog = ({ entries, onDeleteEntry }: FoodLogProps) => {
  const getPurineBadgeVariant = (purine: number) => {
    const level = getPurineLevel(purine);
    switch (level) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  if (entries.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No foods tracked yet. Start by searching and adding foods above.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <Card key={entry.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{entry.foodDescription}</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{entry.amount}g</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getPurineBadgeVariant(entry.purineContent)}>
                {entry.purineContent.toFixed(1)} mg
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteEntry(entry.id)}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
