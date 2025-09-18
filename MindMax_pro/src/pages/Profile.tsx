import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import MoodAvatar from "@/components/MoodAvatar";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Trash2,
  Heart,
  Award,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Wellness Seeker",
    email: "user@mindmax.pro",
    university: "Your University",
    studyYear: "2nd Year"
  });

  const [settings, setSettings] = useState({
    dailyReminders: true,
    weeklyReports: true,
    soundEffects: true,
    dataBackup: false
  });

  const { toast } = useToast();

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated! ✨",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDataExport = () => {
    const data = {
      profile,
      checkIns: JSON.parse(localStorage.getItem('checkIns') || '[]'),
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmax-pro-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported! 📁",
      description: "Your wellness data has been downloaded safely.",
    });
  };

  const handleDataClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('checkIns');
      localStorage.removeItem('currentMood');
      toast({
        title: "Data cleared",
        description: "All your wellness data has been removed.",
        variant: "destructive"
      });
    }
  };

  const achievements = [
    { title: "First Check-in", description: "Completed your first mood check-in", earned: true },
    { title: "Week Warrior", description: "7 consecutive days of check-ins", earned: false },
    { title: "Wellness Explorer", description: "Tried all intervention types", earned: false },
    { title: "Mindful Master", description: "30 total check-ins completed", earned: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Your Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your wellness journey preferences
          </p>
        </div>

        {/* Profile Header */}
        <Card className="shadow-soft mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <MoodAvatar mood="happy" size="xl" disableGlow variant="emoji" />
              <div className="text-center">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.university}</p>
                <Badge variant="secondary" className="mt-2">
                  {profile.studyYear}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={profile.university}
                  onChange={(e) => setProfile({...profile, university: e.target.value})}
                  placeholder="Your university"
                />
              </div>
              
              <div>
                <Label htmlFor="year">Study Year</Label>
                <Input
                  id="year"
                  value={profile.studyYear}
                  onChange={(e) => setProfile({...profile, studyYear: e.target.value})}
                  placeholder="1st Year, 2nd Year, etc."
                />
              </div>
              
              <Button onClick={handleProfileUpdate} className="w-full">
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-wellness-green" />
                App Settings
              </CardTitle>
              <CardDescription>
                Customize your wellness experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Daily Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded to check in daily
                  </p>
                </div>
                <Switch
                  checked={settings.dailyReminders}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, dailyReminders: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly wellness summaries
                  </p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, weeklyReports: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable calming sounds during activities
                  </p>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, soundEffects: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup your data
                  </p>
                </div>
                <Switch
                  checked={settings.dataBackup}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, dataBackup: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-warm-orange" />
                Achievements
              </CardTitle>
              <CardDescription>
                Your wellness milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${
                      achievement.earned 
                        ? "bg-wellness-green-soft border-wellness-green text-wellness-green" 
                        : "bg-muted/50 border-border text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm opacity-80">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Award className="w-5 h-5 text-warm-orange" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-mood-purple" />
                Data & Privacy
              </CardTitle>
              <CardDescription>
                Manage your wellness data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary-soft/10 rounded-lg border border-primary-soft">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">Local Storage</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All your data is stored locally on your device for maximum privacy and security.
                </p>
              </div>
              
              <Button 
                onClick={handleDataExport} 
                variant="outline" 
                className="w-full flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export My Data
              </Button>
              
              <Button 
                onClick={handleDataClear} 
                variant="destructive" 
                className="w-full flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Card className="shadow-soft gradient-calm mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Thank you for prioritizing your mental health</h3>
              <p className="text-muted-foreground">
                Remember: seeking help is a sign of strength, not weakness.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;