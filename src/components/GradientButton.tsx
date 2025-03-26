
import React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const GradientButton = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className,
  ...props
}: GradientButtonProps) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        {
          "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:shadow-lg hover:shadow-blue-500/25": 
            variant === "primary",
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200 hover:shadow-lg hover:shadow-gray-200/25": 
            variant === "secondary",
          "text-xs px-3 py-1.5": size === "sm",
          "text-sm px-5 py-2.5": size === "md",
          "text-base px-7 py-3": size === "lg",
          "w-full": fullWidth
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default GradientButton;
