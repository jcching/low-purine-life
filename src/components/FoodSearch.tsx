import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { foods, getPurineLevel } from "@/data/foods";
import { FoodEntry } from "@/types/tracking";
import { toast } from "sonner";

interface FoodSearchProps {
  onAddFood: (entry: FoodEntry) => void;
}

export const FoodSearch = ({ onAddFood }: FoodSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<typeof foods[0] | null>(null);
  const [amount, setAmount] = useState("100");
  const [showResults, setShowResults] = useState(false);

  const filteredFoods = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return foods
      .filter(food => 
        food.description.toLowerCase().includes(query) ||
        food.category.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [searchQuery]);

  const handleAddFood = () => {
    if (!selectedFood) return;
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const purinePerGram = selectedFood.purineContent / 100;
    const totalPurine = purinePerGram * amountNum;

    const entry: FoodEntry = {
      id: `${Date.now()}-${Math.random()}`,
      foodDescription: selectedFood.description,
      purineContent: totalPurine,
      category: selectedFood.category,
      amount: amountNum,
      timestamp: new Date().toISOString(),
    };

    onAddFood(entry);
    setSearchQuery("");
    setSelectedFood(null);
    setAmount("100");
    setShowResults(false);
    
    toast.success(`Added ${selectedFood.description}`);
  };

  const getPurineBadgeVariant = (level: string) => {
    switch (level) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for foods..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="pl-10"
        />
        
        {showResults && filteredFoods.length > 0 && (
          <Card className="absolute z-10 w-full mt-2 max-h-80 overflow-y-auto shadow-lg">
            {filteredFoods.map((food, index) => {
              const level = getPurineLevel(food.purineContent);
              return (
                <button
                  key={index}
                  className="w-full text-left p-3 hover:bg-muted transition-colors border-b last:border-b-0"
                  onClick={() => {
                    setSelectedFood(food);
                    setSearchQuery(food.description);
                    setShowResults(false);
                  }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{food.description}</p>
                      <p className="text-xs text-muted-foreground">{food.category}</p>
                    </div>
                    <Badge variant={getPurineBadgeVariant(level)}>
                      {food.purineContent} mg
                    </Badge>
                  </div>
                </button>
              );
            })}
          </Card>
        )}
      </div>

      {selectedFood && (
        <Card className="p-4 space-y-4 bg-secondary/50">
          <div>
            <h3 className="font-semibold text-sm mb-1">{selectedFood.description}</h3>
            <p className="text-xs text-muted-foreground">
              {selectedFood.purineContent} mg per 100g | {selectedFood.category}
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">
                Amount (grams)
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                min="1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddFood} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
          
          {amount && parseFloat(amount) > 0 && (
            <p className="text-sm text-muted-foreground">
              Total: <span className="font-semibold text-foreground">
                {((selectedFood.purineContent / 100) * parseFloat(amount)).toFixed(1)} mg
              </span> of purines
            </p>
          )}
        </Card>
      )}
    </div>
  );
};
