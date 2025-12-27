'use client';
import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services/>
      <About/>
      <CTA/>
    </div>
  );
}
