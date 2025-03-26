
import React from "react";
import Builder from "@/components/Builder";

const Index = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Builder id="gjs-editor" className="h-full w-full" />
    </div>
  );
};

export default Index;
