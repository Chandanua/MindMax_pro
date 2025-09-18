import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MoodAvatar from "@/components/MoodAvatar";
import { useToast } from "@/hooks/use-toast";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function analyzeMood(prompt: string): { label: string; mood: "happy" | "sad" | "anxious" | "calm" | "stressed" | "neutral" } {
  const p = prompt.toLowerCase();
  if (/(anxious|anxiety|nervous|worry|panic)/.test(p)) return { label: "anxious", mood: "anxious" };
  if (/(sad|down|depressed|lonely|cry)/.test(p)) return { label: "sad", mood: "sad" };
  if (/(angry|stressed|overwhelmed|pressure)/.test(p)) return { label: "stressed", mood: "stressed" };
  if (/(happy|good|excited|grateful)/.test(p)) return { label: "happy", mood: "happy" };
  if (/(calm|okay|fine|peace)/.test(p)) return { label: "calm", mood: "calm" };
  return { label: "neutral", mood: "neutral" };
}

function generateCompanionReply(prompt: string): string {
  const { mood } = analyzeMood(prompt);
  const openers: Record<string, string[]> = {
    happy: [
      "I love hearing this!",
      "Your energy is contagious!",
      "That smile looks good on you.",
    ],
    calm: [
      "Steady and grounded—nice.",
      "I can feel the calm in your words.",
      "You're doing a great job keeping your balance.",
    ],
    neutral: [
      "Thanks for sharing.",
      "I’m here with you.",
      "Let’s take this one step at a time.",
    ],
    anxious: [
      "I’m right here. Deep breath with me: in 4, hold 4, out 6.",
      "Your feelings make sense. You’re not alone in this.",
      "Let’s shrink this worry together. What’s the smallest next step?",
    ],
    stressed: [
      "That’s a lot to carry. You’ve handled hard days before, and you will again.",
      "Let’s de-load a bit: what can be done in 10 minutes or postponed?",
      "Your effort counts, even when the result is pending.",
    ],
    sad: [
      "I’m sorry it’s heavy today. You matter—more than you realize.",
      "It’s okay to slow down. Your pace is still progress.",
      "Even clouds move. We’ll ride this through together.",
    ],
  };

  const suggestions: Record<string, string[]> = {
    happy: ["Capture this moment—what made it good?", "Want to spread it? A kind message to a friend?"],
    calm: ["Maybe a short walk to keep the calm going?", "A 3-minute breath can lock this feeling in."],
    neutral: ["How would you like to feel in an hour?", "We can try a tiny action to build momentum."],
    anxious: ["Try naming 3 things you can control right now.", "A 4-7-8 breath cycle might help—want to try?"],
    stressed: ["Let’s split the task: 10 minutes focus, 2 minutes rest.", "Jot the top 1 priority—park the rest for later."],
    sad: ["A warm drink and a gentle stretch could help.", "Pick one kind thing for yourself—what would that be?"],
  };

  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const opener = pick(openers[mood]);
  const tip = pick(suggestions[mood]);
  return `${opener} ${tip}`;
}

const Companion = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: "assistant",
    content: "Hey, I’m here for you. Tell me what’s on your mind right now. 💬",
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { role: "user", content: trimmed };
    try {
      setMessages((m) => [...m, userMsg]);
      setInput("");
      const fullReply = generateCompanionReply(trimmed);
      const assistantMsg: ChatMessage = { role: "assistant", content: fullReply };
      setMessages((m) => [...m, assistantMsg]);
      setIsTyping(false);
      toast({ title: "You’ve got this ✨", description: "I’m here anytime you want to talk." });
    } catch (err) {
      console.error("Companion error:", err);
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I hit a snag. I’m still here for you." }]);
    }
  };

  const latestMood = (localStorage.getItem("currentMood") as any) || "neutral";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-card/40 backdrop-blur-xl border border-border shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Mindful Companion</CardTitle>
                <p className="text-sm text-muted-foreground">Real‑time, supportive responses—like a caring friend.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">Live</Badge>
                <MoodAvatar mood={latestMood} size="md" disableGlow variant="emoji" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div ref={containerRef} className="h-[52vh] overflow-y-auto space-y-3 p-2 rounded-md bg-background/30">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div className={`${msg.role === "assistant" ? "bg-accent/30 text-foreground" : "bg-primary/20 text-foreground"} 
                                  border border-border rounded-2xl px-4 py-3 max-w-[80%] whitespace-pre-wrap`}> 
                    {msg.content}
                  </div>
                </div>
              ))}
              {/* instant responses now; no typing indicator */}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me what’s on your mind…"
                className="bg-card/50 backdrop-blur-md"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as React.FormEvent);
                  }
                }}
              />
              <Button type="submit" disabled={isTyping} className="bg-card/60 backdrop-blur-md border border-border">
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Companion;


