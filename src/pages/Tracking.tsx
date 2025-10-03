import { Activity, ArrowLeft, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/StatsCard";
import { FoodLog } from "@/components/FoodLog";
import { useFoodTracking } from "@/hooks/useFoodTracking";
import { Link } from "react-router-dom";

const Tracking = () => {
  const { entries, deleteEntry, getStats } = useFoodTracking();
  const stats = getStats();

  // Get recent entries (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentEntries = entries.filter(e => new Date(e.timestamp) >= weekAgo);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold">Tracking Analytics</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Overview Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Purine Intake Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Daily Average"
              value={stats.daily}
              description="Today's total"
              highlight
            />
            <StatsCard
              title="Weekly Average"
              value={stats.weekly}
              description="Last 7 days"
            />
            <StatsCard
              title="Monthly Average"
              value={stats.monthly}
              description="Last 30 days"
            />
            <StatsCard
              title="Yearly Average"
              value={stats.yearly}
              description="Last 365 days"
            />
          </div>
        </section>

        {/* Health Status Card */}
        <Card className="p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Health Status</h3>
              <div className="space-y-2 text-sm">
                {stats.daily <= 400 ? (
                  <p className="text-success">
                    ✓ Your daily intake is within the recommended range for gout patients (400-600 mg/day)
                  </p>
                ) : stats.daily <= 600 ? (
                  <p className="text-warning">
                    ⚠ Your daily intake is at the upper limit of the recommended range
                  </p>
                ) : (
                  <p className="text-destructive">
                    ✗ Your daily intake exceeds the recommended limit. Consider reducing purine-rich foods.
                  </p>
                )}
                
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="font-medium mb-2">Tips for Managing Purine Intake:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Limit organ meats, shellfish, and red meat</li>
                    <li>Choose low-purine foods like eggs, dairy, and most vegetables</li>
                    <li>Stay hydrated with plenty of water</li>
                    <li>Maintain a healthy weight</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl font-bold mb-4">Recent Activity (Last 7 Days)</h2>
          {recentEntries.length > 0 ? (
            <FoodLog entries={recentEntries} onDeleteEntry={deleteEntry} />
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No entries in the last 7 days</p>
              <Link to="/">
                <Button className="mt-4">Start Tracking</Button>
              </Link>
            </Card>
          )}
        </section>

        {/* Stats Summary */}
        <Card className="mt-8 p-6 bg-secondary/30">
          <h3 className="font-semibold mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total entries tracked</p>
              <p className="text-2xl font-bold">{entries.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Entries this week</p>
              <p className="text-2xl font-bold">{recentEntries.length}</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Tracking;
