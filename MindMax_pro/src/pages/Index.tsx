import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import MoodAvatar from "@/components/MoodAvatar";
import { 
  Heart, 
  CheckCircle, 
  Activity, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Sparkles,
  Brain,
  Users
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Daily Check-ins",
      description: "Track your emotional state with quick, private assessments",
      gradient: "gradient-primary"
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on your mood patterns",
      gradient: "gradient-wellness"
    },
    {
      icon: Activity,
      title: "Micro-Interventions",
      description: "Access breathing exercises and relaxation techniques instantly",
      gradient: "gradient-mood"
    },
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "All data stays on your device - no cloud, no sharing",
      gradient: "gradient-calm"
    }
  ];

  const benefits = [
    "Reduce stress and anxiety",
    "Build emotional resilience", 
    "Improve academic performance",
    "Develop healthy coping strategies"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-transparent">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 gradient-primary shadow-glow animate-float shape-blob flex items-center justify-center">
                  <span className="text-xl">🧠</span>
                </div>
                <div className="w-16 h-16 gradient-wellness shadow-mood animate-float shape-hex flex items-center justify-center" style={{animationDelay: '0.2s'}}>
                  <span className="text-xl">🩺</span>
                </div>
                <div className="w-16 h-16 gradient-mood shadow-soft animate-float shape-triangle flex items-center justify-center" style={{animationDelay: '0.4s'}}>
                  <span className="text-xl">💊</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your AI Wellness
              <span className="block text-primary">
                Companion
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              MindMax Pro helps students manage stress, anxiety, and burnout through 
              personalized check-ins, mood tracking, and therapeutic interventions.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="px-8 py-4 bg-card/50 backdrop-blur-md border border-border text-foreground hover:bg-card/60 shadow-soft">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/checkin">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 border-white/30 text-white hover:bg-white/10"
                >
                  Quick Check-in
                  <Heart className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MindMax Pro?
            </h2>
            <p className="text-xl text-muted-foreground">
              Designed specifically for students' mental health needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-soft hover:shadow-mood transition-all duration-300 text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Transform Your Mental Health Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of students who are taking control of their mental wellness 
                with our evidence-based approach to emotional health.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link to="/dashboard">
                  <Button size="lg" className="gradient-primary text-white shadow-soft">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="grid grid-cols-3 gap-4 animate-float">
                  <div className="w-24 h-24 gradient-primary shadow-glow shape-blob flex items-center justify-center">
                    <span className="text-3xl">💙</span>
                  </div>
                  <div className="w-24 h-24 gradient-wellness shadow-mood shape-hex flex items-center justify-center">
                    <span className="text-3xl">🫁</span>
                  </div>
                  <div className="w-24 h-24 gradient-mood shadow-soft shape-triangle flex items-center justify-center">
                    <span className="text-3xl">🧬</span>
                  </div>
                  <div className="w-24 h-24 gradient-hero shadow-glow shape-diamond flex items-center justify-center">
                    <span className="text-3xl">✨</span>
                  </div>
                  <div className="w-24 h-24 gradient-calm shadow-soft shape-blob flex items-center justify-center">
                    <span className="text-3xl">🧘‍♀️</span>
                  </div>
                  <div className="w-24 h-24 gradient-primary shadow-mood shape-hex flex items-center justify-center">
                    <span className="text-3xl">💤</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-transparent backdrop-blur-2xl backdrop-saturate-150 backdrop-contrast-125 border border-white/10 shadow-glow">
            <CardContent className="pt-12 pb-12">
              <Heart className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Prioritize Your Mental Health?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Start your wellness journey today. It's free, private, and designed just for you.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/checkin">
                  <Button size="lg" className="px-8 py-4 bg-card/50 backdrop-blur-md border border-border text-foreground hover:bg-card/60 shadow-soft">
                    Take Your First Check-in
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-8 py-4 border-white/30 text-white hover:bg-white/10"
                  >
                    Explore Dashboard
                    <TrendingUp className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-white/70 mt-6">
                🔒 Your data stays on your device • No sign-up required
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
