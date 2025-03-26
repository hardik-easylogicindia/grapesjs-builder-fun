
import React, { useRef } from "react";
import Builder from "@/components/Builder";

const Index = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Builder id="gjs-editor" className="h-screen" />
    </div>
  );
};

export default Index;
