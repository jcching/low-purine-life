import { useState, useEffect } from "react";
import { FoodEntry } from "@/types/tracking";

const STORAGE_KEY = "purine-tracker-entries";

export const useFoodTracking = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading stored entries:", error);
      }
    }
  }, []);

  const saveEntries = (newEntries: FoodEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
  };

  const addEntry = (entry: FoodEntry) => {
    saveEntries([entry, ...entries]);
  };

  const deleteEntry = (id: string) => {
    saveEntries(entries.filter(e => e.id !== id));
  };

  const getStats = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const yearAgo = new Date(today);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    const todayEntries = entries.filter(e => new Date(e.timestamp) >= today);
    const weekEntries = entries.filter(e => new Date(e.timestamp) >= weekAgo);
    const monthEntries = entries.filter(e => new Date(e.timestamp) >= monthAgo);
    const yearEntries = entries.filter(e => new Date(e.timestamp) >= yearAgo);

    const sum = (arr: FoodEntry[]) => arr.reduce((acc, e) => acc + e.purineContent, 0);

    const dailyTotal = sum(todayEntries);
    const weeklyAvg = weekEntries.length > 0 ? sum(weekEntries) / 7 : 0;
    const monthlyAvg = monthEntries.length > 0 ? sum(monthEntries) / 30 : 0;
    const yearlyAvg = yearEntries.length > 0 ? sum(yearEntries) / 365 : 0;

    return {
      daily: dailyTotal,
      weekly: weeklyAvg,
      monthly: monthlyAvg,
      yearly: yearlyAvg,
      todayEntries,
    };
  };

  return {
    entries,
    addEntry,
    deleteEntry,
    getStats,
  };
};
