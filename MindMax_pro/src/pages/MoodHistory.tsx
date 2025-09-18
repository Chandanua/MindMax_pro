import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import MoodAvatar from "@/components/MoodAvatar";
import { Calendar, TrendingUp, BarChart3, Clock } from "lucide-react";

interface CheckInData {
  mood: "happy" | "sad" | "anxious" | "calm" | "stressed" | "neutral";
  intensity: number;
  notes: string;
  timestamp: string;
}

const MoodHistory = () => {
  const [checkIns, setCheckIns] = useState<CheckInData[]>([]);
  const [weeklyStats, setWeeklyStats] = useState({
    averageMood: 6.5,
    mostCommonMood: "calm" as const,
    totalCheckIns: 0,
    improvementTrend: "+12%"
  });

  useEffect(() => {
    // Load check-ins from localStorage
    const savedCheckIns = JSON.parse(localStorage.getItem('checkIns') || '[]');
    setCheckIns(savedCheckIns);
    
    // Calculate stats
    if (savedCheckIns.length > 0) {
      const avgIntensity = savedCheckIns.reduce((sum: number, checkIn: CheckInData) => sum + checkIn.intensity, 0) / savedCheckIns.length;
      const moodCounts = savedCheckIns.reduce((counts: any, checkIn: CheckInData) => {
        counts[checkIn.mood] = (counts[checkIn.mood] || 0) + 1;
        return counts;
      }, {});
      const mostCommon = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
      
      setWeeklyStats({
        averageMood: avgIntensity,
        mostCommonMood: mostCommon as any,
        totalCheckIns: savedCheckIns.length,
        improvementTrend: "+12%"
      });
    }
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      happy: "text-warm-orange",
      calm: "text-wellness-green", 
      neutral: "text-muted-foreground",
      anxious: "text-destructive",
      stressed: "text-mood-purple",
      sad: "text-primary"
    };
    return colors[mood as keyof typeof colors] || "text-muted-foreground";
  };

  const recentCheckIns = checkIns.slice(-7).reverse(); // Last 7 check-ins

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Your Wellness Journey
          </h1>
          <p className="text-muted-foreground">
            Track your progress and celebrate your growth
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              <TrendingUp className="h-4 w-4 text-wellness-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wellness-green">
                {weeklyStats.averageMood.toFixed(1)}/10
              </div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Common</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <MoodAvatar mood={weeklyStats.mostCommonMood} size="sm" />
                <span className="text-lg font-semibold capitalize">
                  {weeklyStats.mostCommonMood}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-ins</CardTitle>
              <Calendar className="h-4 w-4 text-mood-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mood-purple">
                {weeklyStats.totalCheckIns}
              </div>
              <p className="text-xs text-muted-foreground">
                Total recorded
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-warm-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warm-orange">
                {weeklyStats.improvementTrend}
              </div>
              <p className="text-xs text-muted-foreground">
                From last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Check-ins */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Recent Check-ins
            </CardTitle>
            <CardDescription>
              Your latest mood entries and reflections
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentCheckIns.length > 0 ? (
              <div className="space-y-4">
                {recentCheckIns.map((checkIn, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-accent/30 border border-border">
                    <MoodAvatar mood={checkIn.mood} size="sm" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="secondary" 
                            className={`${getMoodColor(checkIn.mood)} bg-transparent`}
                          >
                            {checkIn.mood.charAt(0).toUpperCase() + checkIn.mood.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Intensity: {checkIn.intensity}/10
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(checkIn.timestamp)}
                        </span>
                      </div>
                      {checkIn.notes && (
                        <p className="text-sm text-foreground bg-card p-3 rounded-md">
                          "{checkIn.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No check-ins yet. Start tracking your mood to see your progress!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="shadow-soft gradient-calm">
          <CardHeader>
            <CardTitle>Weekly Insights ✨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Positive Patterns</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• You tend to feel calmer in the evenings</li>
                  <li>• Your mood improves after wellness activities</li>
                  <li>• Consistent check-ins help maintain balance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Suggestions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Try morning breathing exercises</li>
                  <li>• Consider journaling when feeling stressed</li>
                  <li>• Keep up the great work with regular check-ins!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MoodHistory;