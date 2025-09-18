import { cn } from "@/lib/utils";

interface MoodAvatarProps {
  mood: "happy" | "sad" | "anxious" | "calm" | "stressed" | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  disableGlow?: boolean;
  variant?: "emoji" | "shape";
}

const MoodAvatar = ({ mood, size = "md", className, disableGlow = false, variant = "emoji" }: MoodAvatarProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  const innerShapeSize = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  } as const;

  const moodStyles = {
    happy: {
      bg: "bg-gradient-to-br from-warm-orange to-sunset-pink",
      emoji: "😊",
      glow: "shadow-[0_0_20px_hsl(var(--warm-orange)/0.5)]"
    },
    sad: {
      bg: "bg-gradient-to-br from-primary to-mood-purple",
      emoji: "😢",
      glow: "shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
    },
    anxious: {
      bg: "bg-gradient-to-br from-destructive to-warm-orange",
      emoji: "😰",
      glow: "shadow-[0_0_20px_hsl(var(--destructive)/0.4)]"
    },
    calm: {
      bg: "bg-gradient-to-br from-wellness-green to-primary",
      emoji: "😌",
      glow: "shadow-[0_0_20px_hsl(var(--wellness-green)/0.5)]"
    },
    stressed: {
      bg: "bg-gradient-to-br from-mood-purple to-destructive",
      emoji: "😵",
      glow: "shadow-[0_0_20px_hsl(var(--mood-purple)/0.4)]"
    },
    neutral: {
      bg: "bg-gradient-to-br from-muted to-accent",
      emoji: "😐",
      glow: "shadow-[0_0_20px_hsl(var(--muted)/0.3)]"
    }
  };

  const currentMood = moodStyles[mood];

  const moodToShape: Record<MoodAvatarProps["mood"], string> = {
    happy: "shape-blob",
    calm: "shape-hex",
    neutral: "shape-diamond",
    anxious: "shape-triangle",
    stressed: "shape-hex",
    sad: "shape-blob",
  };

  return (
    <div className={cn(
      "rounded-full flex items-center justify-center transition-all duration-500 animate-pulse-soft",
      sizeClasses[size],
      currentMood.bg,
      disableGlow ? undefined : currentMood.glow,
      className
    )}>
      {variant === "emoji" ? (
        <span className="text-white text-2xl font-bold drop-shadow-md">
          {currentMood.emoji}
        </span>
      ) : (
        <div className={cn("bg-white/80", innerShapeSize[size], moodToShape[mood])} />
      )}
    </div>
  );
};

export default MoodAvatar;