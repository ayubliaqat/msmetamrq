"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Target, Lightbulb, Rocket, Award, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen pt-32">
      {/* 1. STORY SECTION - Personal & Professional */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-gray-50 shadow-2xl">
              <Image 
                src="/about/profile.jpg" // Add your professional photo here
                alt="MS Visuals Founder"
                width={600}
                height={700}
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block">
              <p className="text-4xl font-black mb-1">5+</p>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em]">Years of <br/> Excellence</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
              The Mind Behind MS Visuals
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#0B1F3A] mb-6 leading-tight">
              Driving Growth Through <span className="text-orange-500 italic">Strategic Design.</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
              Hello, I’m the founder of MS Visuals. My journey started with a simple passion for design, which evolved into a full-scale digital agency. I believe that a brand is more than just a logo—it&apos;s a promise of quality and a tool for business growth.
            </p>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              With over 5 years in the Pakistani market and international landscape, I specialized in Meta Marketing and Shopify solutions to help businesses scale from zero to millions in PKR revenue.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {["Strategic Planner", "Creative Director", "Ads Specialist", "Shopify Expert"].map((tag) => (
                <div key={tag} className="flex items-center gap-2 text-[#0B1F3A] font-bold text-sm">
                  <CheckCircle className="text-orange-500" size={16} /> {tag}
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-block bg-[#0B1F3A] text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-orange-500 transition-all">
              Let&apos;s Connect
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE VALUES - Why We Do What We Do */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-[#0B1F3A] mb-4">Core Principles</h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Target className="text-orange-500" />, 
                title: "Precision", 
                desc: "Every pixel and every ad cent is placed with purpose. We don't guess; we calculate." 
              },
              { 
                icon: <Lightbulb className="text-orange-500" />, 
                title: "Innovation", 
                desc: "Staying ahead of trends to ensure your brand remains relevant in a fast-changing market." 
              },
              { 
                icon: <Rocket className="text-orange-500" />, 
                title: "Scalability", 
                desc: "Building systems that grow with you. From your first sale to your first million." 
              }
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-4 uppercase tracking-tight">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ACHIEVEMENTS - High Contrast Section */}
      <section className="bg-[#0B1F3A] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4 italic">Recognized for Excellence</h2>
              <p className="text-gray-400 text-sm">Our work has helped local startups transition into household names across Pakistan.</p>
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
               <div className="flex flex-col items-center">
                 <Award className="text-orange-500 mb-2" size={40} />
                 <span className="text-white font-bold text-xs uppercase tracking-widest text-center">Top Rated <br/> Freelancer</span>
               </div>
               <div className="flex flex-col items-center">
                 <ShieldCheck className="text-orange-500 mb-2" size={40} />
                 <span className="text-white font-bold text-xs uppercase tracking-widest text-center">Certified Meta <br/> Media Buyer</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-32 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F3A] mb-8 tracking-tighter">
            HAVE A PROJECT IN MIND? <br/> <span className="text-orange-500 uppercase">LET&apos;S SCALE IT.</span>
          </h2>
          <p className="text-gray-500 mb-10 text-sm md:text-base">
            I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link href="/contact" className="bg-orange-500 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#0B1F3A] transition-all shadow-xl shadow-orange-500/20">
            Start a Conversation
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

// Small helper component for the Award section
function ShieldCheck({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} height={size} 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}