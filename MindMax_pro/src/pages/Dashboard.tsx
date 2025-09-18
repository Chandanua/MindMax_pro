import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import MoodAvatar from "@/components/MoodAvatar";
import { Heart, CheckCircle, TrendingUp, Activity, ArrowRight, Calendar } from "lucide-react";

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState<"happy" | "sad" | "anxious" | "calm" | "stressed" | "neutral">("neutral");
  const [checkInStreak, setCheckInStreak] = useState(3);
  
  useEffect(() => {
    // Simulate loading user's current mood
    const savedMood = localStorage.getItem('currentMood') as any;
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  const todayStats = {
    checkIns: 1,
    interventions: 2,
    moodScore: 7.2,
    streakDays: checkInStreak
  };

  const quickActions = [
    {
      title: "Quick Check-in",
      description: "How are you feeling right now?",
      icon: CheckCircle,
      href: "/checkin",
      gradient: "gradient-primary"
    },
    {
      title: "Breathing Exercise", 
      description: "Take a moment to breathe",
      icon: Activity,
      href: "/interventions",
      gradient: "gradient-wellness"
    },
    {
      title: "View Progress",
      description: "See your wellness journey", 
      icon: TrendingUp,
      href: "/mood-history",
      gradient: "gradient-mood"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Let's check in with your mental wellness today
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <MoodAvatar mood={currentMood} size="lg" />
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Your Mood Twin</p>
                <Badge variant="secondary" className="mt-1">
                  {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Calendar className="h-4 w-4 text-warm-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warm-orange">
                {todayStats.streakDays} days
              </div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-ins</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {todayStats.checkIns}
              </div>
              <p className="text-xs text-muted-foreground">
                Today
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
              <Heart className="h-4 w-4 text-wellness-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wellness-green">
                {todayStats.moodScore}/10
              </div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activities</CardTitle>
              <Activity className="h-4 w-4 text-mood-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mood-purple">
                {todayStats.interventions}
              </div>
              <p className="text-xs text-muted-foreground">
                Today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="shadow-soft hover:shadow-mood transition-all duration-300 group cursor-pointer">
                <Link to={action.href}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${action.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-primary font-medium">
                      Get started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Daily Reminder */}
        <Card className="shadow-soft gradient-calm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Remember: You're not alone 💙
                </h3>
                <p className="text-muted-foreground mt-2">
                  Taking care of your mental health is just as important as your physical health.
                </p>
              </div>
              <div className="animate-float">
                <Heart className="w-12 h-12 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;