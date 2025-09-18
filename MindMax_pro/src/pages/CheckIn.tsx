import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import MoodAvatar from "@/components/MoodAvatar";
import { CheckCircle, MessageSquare, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CheckIn = () => {
  const [selectedMood, setSelectedMood] = useState<"happy" | "sad" | "anxious" | "calm" | "stressed" | "neutral">("neutral");
  const [moodIntensity, setMoodIntensity] = useState([5]);
  const [textEntry, setTextEntry] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const moodOptions = [
    { mood: "happy" as const, label: "Happy", color: "text-warm-orange" },
    { mood: "calm" as const, label: "Calm", color: "text-wellness-green" },
    { mood: "neutral" as const, label: "Neutral", color: "text-muted-foreground" },
    { mood: "anxious" as const, label: "Anxious", color: "text-destructive" },
    { mood: "stressed" as const, label: "Stressed", color: "text-mood-purple" },
    { mood: "sad" as const, label: "Sad", color: "text-primary" },
  ];

  const handleSubmitCheckIn = () => {
    // Save to localStorage (simulating local storage)
    const checkInData = {
      mood: selectedMood,
      intensity: moodIntensity[0],
      notes: textEntry,
      timestamp: new Date().toISOString(),
    };
    
    const existingCheckIns = JSON.parse(localStorage.getItem('checkIns') || '[]');
    existingCheckIns.push(checkInData);
    localStorage.setItem('checkIns', JSON.stringify(existingCheckIns));
    localStorage.setItem('currentMood', selectedMood);

    toast({
      title: "Check-in completed! ✨",
      description: "Your mood has been recorded. Great job taking care of yourself!",
    });

    navigate("/dashboard");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Voice recording started 🎤",
        description: "Speak freely about how you're feeling...",
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Your voice note has been processed.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            How are you feeling today?
          </h1>
          <p className="text-muted-foreground">
            Take a moment to check in with yourself. Your feelings are valid.
          </p>
        </div>

        {/* Mood Selection */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-primary" />
              Select Your Mood
            </CardTitle>
            <CardDescription>
              Choose the mood that best represents how you're feeling right now
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {moodOptions.map((option) => (
                <div
                  key={option.mood}
                  onClick={() => setSelectedMood(option.mood)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center ${
                    selectedMood === option.mood
                      ? "border-primary bg-primary/10 shadow-mood"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <MoodAvatar mood={option.mood} size="md" className="mx-auto mb-3" disableGlow variant="emoji" />
                  <Badge
                    variant={selectedMood === option.mood ? "default" : "secondary"}
                    className={selectedMood === option.mood ? "bg-primary" : ""}
                  >
                    {option.label}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Mood Intensity Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-4">
                Intensity Level: <span className="font-bold text-primary">{moodIntensity[0]}/10</span>
              </label>
              <Slider
                value={moodIntensity}
                onValueChange={setMoodIntensity}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mood Twin Preview */}
        <Card className="shadow-soft mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-3">Your Mood Twin</p>
                <MoodAvatar mood={selectedMood} size="xl" disableGlow variant="emoji" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">
                  I can see you're feeling{" "}
                  <span className="text-primary font-bold">
                    {selectedMood}
                  </span>
                </p>
                <p className="text-muted-foreground mt-2">
                  at intensity level {moodIntensity[0]}/10
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text/Voice Input */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-wellness-green" />
              Tell Us More
            </CardTitle>
            <CardDescription>
              Share what's on your mind (optional)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="What's contributing to how you feel today? You can write about anything..."
                value={textEntry}
                onChange={(e) => setTextEntry(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              
              <div className="flex justify-center">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={toggleRecording}
                  className="flex items-center space-x-2"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      <span>Stop Recording</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Voice Note</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="text-center">
          <Button
            onClick={handleSubmitCheckIn}
            size="lg"
            className="px-8 py-3 gradient-primary text-white font-semibold shadow-soft hover:shadow-glow transition-all duration-300"
          >
            Complete Check-in ✨
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Your data is stored locally and privately on your device
          </p>
        </div>
      </main>
    </div>
  );
};

export default CheckIn;