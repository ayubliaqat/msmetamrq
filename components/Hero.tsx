// components/Hero.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "./Button";

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Graphic Design", "Social Media Campaigns", "Digital Growth"];

  // Smooth text transition
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3500); // slower, smoother transition
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0B1F3A] text-gray-100 py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Elevate Your Brand with{" "}
          <span className="text-orange-400 transition-all duration-700 ease-in-out">
            {texts[textIndex]}
          </span>
        </h1>

        <p className="text-md sm:text-lg md:text-xl text-gray-200 max-w-3xl opacity-90 mb-12">
          MS Visuals crafts professional designs, social media campaigns, and
          digital solutions that make your brand stand out and grow online.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            label="Get Started"
            variant="orange"
            onClick={() => alert("Get Started clicked")}
          />
          <Button
            label="See My Work"
            variant="gray"
            onClick={() => alert("See Our Work clicked")}
          />
        </div>
      </div>

      {/* Subtle animated background circles */}
      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-[#F4A300]/10 rounded-full filter blur-3xl animate-pulse-slow -z-10"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-[#F4A300]/5 rounded-full filter blur-2xl animate-pulse-slow -z-10"></div>
    </section>
  );
}
