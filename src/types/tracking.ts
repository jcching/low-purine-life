export interface FoodEntry {
  id: string;
  foodDescription: string;
  purineContent: number;
  category: string;
  amount: number; // in grams
  timestamp: string;
}

export interface DailyStats {
  date: string;
  totalPurine: number;
  entries: FoodEntry[];
}
