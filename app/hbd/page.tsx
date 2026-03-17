"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowDown, Play, Pause } from 'lucide-react';

export default function BirthdayExperience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="relative bg-white text-slate-800 selection:bg-pink-100 overflow-x-hidden">
      
      {/* 1. THE OPENING */}
      <SectionWrapper bg="bg-gradient-to-b from-rose-50 to-white">
        <div className="text-center z-10 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-6 py-2"
          >
            Happy Birthday <br/> Maria Shahzadiiiii 🎉
          </motion.h1>
          <p className="text-slate-500 text-lg md:text-xl font-light tracking-widest uppercase">
            A Journey Crafted Just For You
          </p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-20 opacity-50">
            <ArrowDown size={30} className="mx-auto text-pink-400" />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* 2. FIRST VIDEO SECTION */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-4xl font-bold text-slate-800 italic">Moments We Cherish ✨</h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              Every second spent with you is a memory I hold close to my heart. 
              Click the video to relive one of our most beautiful moments.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <VideoPlayer src="/videos/love1.mp4" />
          </div>
        </div>
      </section>

      {/* 3. EMOTIONS SECTION */}
      <SectionWrapper bg="bg-rose-50/30">
        <div className="max-w-4xl px-6 text-center">
          <TypingText text="Today is not just a day..." className="text-3xl text-slate-400 italic mb-4" />
          <motion.h2 
            whileInView={{ scale: [0.95, 1] }}
            className="text-5xl md:text-7xl font-medium text-slate-900"
          >
            It’s the celebration of <br/>
            <span className="text-pink-500">Maria Shahzadiiiii 💖</span>
          </motion.h2>
          <p className="mt-8 text-xl text-slate-500 italic">"You make my world infinitely more beautiful."</p>
        </div>
      </SectionWrapper>

      {/* 4. SECOND VIDEO SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <VideoPlayer src="/videos/love2.mp4" />
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-800 italic">The Melody of Us 🎵</h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              Our bond is like a perfect song—sometimes soft, sometimes powerful, 
              but always in perfect harmony.
            </p>
          </div>
        </div>
      </section>

      {/* 5. GIFTS SECTION (Fixed Bangles Image) */}
      <section className="bg-slate-50 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-slate-400 uppercase tracking-[0.3em]">Tokens of My Love</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-12 px-6">
         {/* Colorful Bangle Card */}
<div className="w-[380px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 transition-transform hover:scale-[1.02]">
  <img 
    src="https://images.unsplash.com/photo-1679156272446-30738eb5c4e7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    className="h-72 w-full object-cover" 
    alt="Colorful Bangles" 
  />
  <div className="p-8 text-center">
    <h3 className="text-2xl font-bold text-slate-800">Colorful Bangles for you!</h3>
    <p className="text-slate-500 mt-3 italic text-lg">A spectrum of colors as bright and joyful as your spirit.</p>
  </div>
</div>
          {/* Flower Card */}
          <div className="w-[380px] h-[460px] bg-white rounded-[2rem] shadow-2xl flex flex-col items-center justify-center border border-pink-100 p-8 transition-transform hover:scale-[1.02]">
             <FlowerArt />
             <h3 className="mt-10 text-2xl font-bold text-slate-800"></h3>
             <p className="text-slate-500 mt-3 italic text-lg text-center">A bloom that stays fresh forever.</p>
          </div>
        </div>
      </section>

      {/* 6. THIRD VIDEO SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black italic text-slate-900">Unconditional Love ❤️</h2>
            <p className="text-slate-400 mt-4 tracking-widest uppercase">Tap to play our final memory</p>
          </div>
          <VideoPlayer src="/videos/love3.mp4" />
        </div>
      </section>

      {/* 7. GRAND ENDING */}
      <SectionWrapper bg="bg-white border-t border-slate-50">
        <div className="text-center px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-12">
            <Heart className="text-rose-500 mx-auto fill-rose-500 mb-6" size={40} />
            <p className="text-2xl md:text-3xl font-light text-slate-600 italic max-w-2xl mx-auto">
              "I promise to always stand by you, to make you smile, and to celebrate every moment with you."
            </p>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight">
            Happy Birthday <br/>
            <span className="text-pink-600">Maria Shahzadiiiii 🎂</span>
          </h2>
        </div>
      </SectionWrapper>
    </main>
  );
}

// --- Video Player Component (Playable on Click) ---
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      onClick={togglePlay}
      className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-video bg-slate-900 cursor-pointer group"
    >
      <video ref={videoRef} playsInline className="w-full h-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-full">
          {isPlaying ? <Pause size={40} className="text-white" /> : <Play size={40} className="text-white fill-white ml-1" />}
        </div>
      </div>
    </div>
  );
}

// --- Supporting Components ---
function SectionWrapper({ children, bg }: { children: React.ReactNode, bg: string }) {
  return <section className={`min-h-screen w-full flex items-center justify-center relative ${bg}`}>{children}</section>;
}

function FlowerArt() {
  return (
    <div className="relative h-40 w-40 flex items-center justify-center">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d, i) => (
        <motion.div key={i} initial={{ scale: 0, rotate: d }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.1 }} style={{ rotate: `${d}deg`, transformOrigin: "bottom center" }} className="absolute bottom-1/2 left-1/2 w-10 h-20 bg-gradient-to-t from-pink-400 to-rose-300 rounded-full opacity-90 -translate-x-1/2" />
      ))}
      <div className="w-10 h-10 bg-yellow-400 rounded-full z-10 shadow-inner" />
    </div>
  );
}

function TypingText({ text, className }: { text: string, className?: string }) {
  return <motion.p className={className}>{text.split("").map((c, i) => (<motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>{c === " " ? "\u00A0" : c}</motion.span>))}</motion.p>;
}