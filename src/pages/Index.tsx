import { Activity, BarChart3, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodSearch } from "@/components/FoodSearch";
import { FoodLog } from "@/components/FoodLog";
import { StatsCard } from "@/components/StatsCard";
import { useFoodTracking } from "@/hooks/useFoodTracking";
import { Link } from "react-router-dom";

const Index = () => {
  const { entries, addEntry, deleteEntry, getStats } = useFoodTracking();
  const stats = getStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Purine Tracker</h1>
            </div>
            <Link to="/tracking">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">View Analytics</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Daily Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Today's Intake
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Daily Total"
              value={stats.daily}
              highlight
              description="Today's intake"
            />
            <StatsCard
              title="Weekly Avg"
              value={stats.weekly}
              description="Past 7 days"
            />
            <StatsCard
              title="Monthly Avg"
              value={stats.monthly}
              description="Past 30 days"
            />
            <StatsCard
              title="Yearly Avg"
              value={stats.yearly}
              description="Past 365 days"
            />
          </div>
        </section>

        {/* Guidelines Info */}
        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-2 text-primary">Daily Purine Guidelines</h3>
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>• <span className="font-medium text-success">Low:</span> &lt;100 mg/100g - Safe for regular consumption</p>
            <p>• <span className="font-medium text-warning">Medium:</span> 100-200 mg/100g - Consume in moderation</p>
            <p>• <span className="font-medium text-destructive">High:</span> &gt;200 mg/100g - Limit or avoid</p>
            <p className="mt-2 text-xs">Recommended daily intake: 400-600 mg for gout patients</p>
          </div>
        </Card>

        {/* Food Tracking Tabs */}
        <Tabs defaultValue="add" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add Food</TabsTrigger>
            <TabsTrigger value="log">
              Food Log ({stats.todayEntries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Search & Add Foods</h2>
              <FoodSearch onAddFood={addEntry} />
            </Card>
          </TabsContent>

          <TabsContent value="log" className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-4">Today's Foods</h2>
              <FoodLog 
                entries={stats.todayEntries} 
                onDeleteEntry={deleteEntry}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Track your purine intake to better manage gout symptoms</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
