
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
    medium: "bg-white/80 dark:bg-gray-900/80",
    heavy: "bg-white/95 dark:bg-gray-900/95",
  };

  return (
    <div
      className={cn(
        "backdrop-blur-xl",
        intensityClasses[intensity],
        "shadow-lg transition-all duration-300 border-gray-200/50",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BlurPanel;
