
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const Feature = ({ icon: Icon, title, description, className }: FeatureProps) => {
  return (
    <div className={cn("flex flex-col items-center text-center p-6", className)}>
      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default Feature;
