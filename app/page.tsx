'use client';
import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutMe from '@/components/AboutMe'
import Portfolio from "@/components/Portfolio";
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <AboutMe/>
      <Services/>
      <Portfolio/>
      <About/>
      <CTA/>
    </div>
  );
}
