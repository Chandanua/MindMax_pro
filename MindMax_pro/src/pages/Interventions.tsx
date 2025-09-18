import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Wind, 
  Heart, 
  Moon, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw,
  Timer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Interventions = () => {
  const [activeIntervention, setActiveIntervention] = useState<string | null>(null);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const { toast } = useToast();

  const interventions = [
    {
      id: "breathing",
      title: "4-7-8 Breathing",
      description: "A calming breathing technique to reduce anxiety and stress",
      icon: Wind,
      gradient: "gradient-primary",
      duration: "4 minutes",
      benefits: ["Reduces anxiety", "Improves focus", "Promotes relaxation"]
    },
    {
      id: "meditation",
      title: "Mindful Moment",
      description: "A short guided meditation to center yourself",
      icon: Sparkles,
      gradient: "gradient-wellness",
      duration: "5 minutes",
      benefits: ["Increases awareness", "Reduces stress", "Improves mood"]
    },
    {
      id: "gratitude",
      title: "Gratitude Practice",
      description: "Reflect on positive aspects of your day",
      icon: Heart,
      gradient: "gradient-mood",
      duration: "3 minutes",
      benefits: ["Boosts positivity", "Improves perspective", "Enhances wellbeing"]
    },
    {
      id: "relaxation",
      title: "Progressive Relaxation",
      description: "Release tension from your body and mind",
      icon: Moon,
      gradient: "gradient-calm",
      duration: "10 minutes",
      benefits: ["Reduces muscle tension", "Promotes sleep", "Decreases stress"]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathingActive && activeIntervention === "breathing") {
      interval = setInterval(() => {
        setBreathingTimer((prev) => {
          const newTime = prev + 1;
          
          // 4-7-8 breathing pattern
          if (newTime <= 4) {
            setBreathingPhase("inhale");
          } else if (newTime <= 11) {
            setBreathingPhase("hold");
          } else if (newTime <= 19) {
            setBreathingPhase("exhale");
          } else {
            return 0; // Reset cycle
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, activeIntervention]);

  const startIntervention = (id: string) => {
    setActiveIntervention(id);
    if (id === "breathing") {
      setIsBreathingActive(true);
      setBreathingTimer(0);
    }
    
    toast({
      title: "Intervention started 🌱",
      description: "Take your time and focus on yourself",
    });
  };

  const stopIntervention = () => {
    setActiveIntervention(null);
    setIsBreathingActive(false);
    setBreathingTimer(0);
    
    toast({
      title: "Great job! ✨",
      description: "You've completed your wellness activity",
    });
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case "inhale":
        return "Breathe in slowly...";
      case "hold":
        return "Hold your breath...";
      case "exhale":
        return "Exhale completely...";
      default:
        return "Get ready...";
    }
  };

  const renderBreathingVisual = () => {
    const scale = breathingPhase === "inhale" ? "scale-125" : 
                   breathingPhase === "hold" ? "scale-110" : "scale-90";
    
    return (
      <Card className="shadow-mood mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-6">
            <div className={`w-32 h-32 rounded-full gradient-primary flex items-center justify-center transition-transform duration-1000 ${scale}`}>
              <Wind className="w-16 h-16 text-white" />
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                {getBreathingInstruction()}
              </h3>
              <Badge variant="secondary" className="text-lg">
                {breathingPhase.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setIsBreathingActive(!isBreathingActive)}
              >
                {isBreathingActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isBreathingActive ? "Pause" : "Resume"}
              </Button>
              <Button variant="outline" onClick={stopIntervention}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Wellness Interventions
          </h1>
          <p className="text-muted-foreground">
            Choose an activity to help you feel better and more balanced
          </p>
        </div>

        {/* Active Intervention */}
        {activeIntervention === "breathing" && renderBreathingVisual()}

        {/* Interventions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interventions.map((intervention) => {
            const Icon = intervention.icon;
            const isActive = activeIntervention === intervention.id;
            
            return (
              <Card 
                key={intervention.id} 
                className={`shadow-soft hover:shadow-mood transition-all duration-300 ${
                  isActive ? "ring-2 ring-primary shadow-glow" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${intervention.gradient} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="flex items-center">
                      <Timer className="w-3 h-3 mr-1" />
                      {intervention.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{intervention.title}</CardTitle>
                  <CardDescription>{intervention.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-sm">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {intervention.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => 
                      isActive ? stopIntervention() : startIntervention(intervention.id)
                    }
                    className="w-full"
                    variant={isActive ? "destructive" : "default"}
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Stop Activity
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Activity
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Motivational Quote */}
        <Card className="shadow-soft gradient-calm mt-8">
          <CardContent className="pt-6">
            <blockquote className="text-center">
              <p className="text-lg italic text-foreground mb-4">
                "You are not a drop in the ocean, but the entire ocean in each drop."
              </p>
              <footer className="text-muted-foreground">
                — Rumi
              </footer>
            </blockquote>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Interventions;