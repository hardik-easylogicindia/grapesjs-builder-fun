
import React from "react";
import { cn } from "@/lib/utils";

interface BlurPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

const BlurPanel = ({
  children,
  className,
  intensity = "medium",
}: BlurPanelProps) => {
  const intensityClasses = {
    light: "bg-white/60 dark:bg-gray-900/60",
    medium: "bg-white/70 dark:bg-gray-900/70",
    heavy: "bg-white/80 dark:bg-gray-900/80",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 dark:border-gray-800",
        "backdrop-blur-lg",
        intensityClasses[intensity],
        "shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BlurPanel;
