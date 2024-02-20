import React from "react";
import Home from "./_home";
import { Toaster } from "@/components/ui/toaster";

const index = () => {
  return (
    <main>
      <Home />
      <Toaster />
    </main>
  );
};

export default index;
