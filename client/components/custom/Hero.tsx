import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="w-full py-40 max-h-screen h-full flex flex-col justify-center items-center space-y-6 text-center">
      <div>
        <h2 className="text-5xl font-bold max-w-4xl tracking-tight">
          Stop losing track of your applications. Start landing interviews.
        </h2>
      </div>
      <div>
        <p className="text-xl max-w-4xl font-semibold">
          Track applications, prep for interviews, and stay organized throughout
          your entire job search.
        </p>
      </div>
      <div className="space-y-4">
        <Button
          size="lg"
          className="bg-[#3B82F6] px-8 py-3 font-semibold hover:cursor-pointer hover:bg-blue-400"
        >
          Start Free
        </Button>
        <p className="text-xs text-gray-600">
          <span className="text-[#3B82F6] mx-1">✓</span>
          Free forever
          <span className="text-[#3B82F6] mx-1">✓</span>
          Setup in 60 seconds
          <span className="text-[#3B82F6] mx-1">✓</span>
          Your data stays yours
        </p>
      </div>
    </div>
  );
};

export default Hero;
