"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Users, Layout, Trophy, X, Search } from "lucide-react";

// 1. Expanded Project Data (5 per category recommended)
const projects = [
  // Graphic Design
  { id: 1, title: "Modern Brand Identity", category: "Graphic Design", image: "/portfolio/brand-1.jpg" },
  { id: 2, title: "Corporate Rebranding", category: "Graphic Design", image: "/portfolio/brand-2.jpg" },
  { id: 3, title: "Minimalist Stationery", category: "Graphic Design", image: "/portfolio/brand-3.jpg" },
  { id: 4, title: "Product Packaging", category: "Graphic Design", image: "/portfolio/brand-4.jpg" },
  { id: 5, title: "Vector Illustration", category: "Graphic Design", image: "/portfolio/brand-5.jpg" },
  
  // Meta Marketing
  { id: 6, title: "E-commerce Growth", category: "Meta Marketing", image: "/portfolio/meta-1.jpg" },
  { id: 7, title: "Luxury Fashion Ads", category: "Meta Marketing", image: "/portfolio/meta-2.jpg" },
  { id: 8, title: "Real Estate Funnel", category: "Meta Marketing", image: "/portfolio/meta-3.jpg" },
  { id: 9, title: "Lead Gen Campaign", category: "Meta Marketing", image: "/portfolio/meta-4.jpg" },
  { id: 10, title: "Retargeting Strategy", category: "Meta Marketing", image: "/portfolio/meta-5.jpg" },

  // Shopify & WhatsApp (Add your specific images here)
  { id: 11, title: "Tech Store Setup", category: "Shopify", image: "/portfolio/shopify-1.jpg" },
  { id: 12, title: "WhatsApp CRM Setup", category: "WhatsApp", image: "/portfolio/whatsapp-1.jpg" },
];

const categories = ["All", "Graphic Design", "Meta Marketing", "Shopify", "WhatsApp"];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const filteredProjects = projects.filter(p => filter === "All" || p.category === filter);

  return (
    <main className="bg-white min-h-screen pt-32">
      
      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-[#0B1F3A]/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImg} 
                alt="Selected work" 
                fill 
                className="object-contain"
              />
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute -top-10 right-0 text-white hover:text-orange-500 transition-colors"
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Showcase
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-[#0B1F3A] mb-6 tracking-tight"
          >
            Work that drives <span className="text-orange-500 font-black italic">results.</span>
          </motion.h1>
        </div>
      </section>

      {/* FILTERABLE GALLERY */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                filter === cat 
                ? "bg-orange-500 text-white shadow-lg" 
                : "bg-gray-50 text-[#0B1F3A] hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 cursor-pointer"
                onClick={() => setSelectedImg(project.image)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* View Overlay */}
                <div className="absolute inset-0 bg-[#0B1F3A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6">
                  <Search className="mb-2 text-orange-500" size={28} />
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-orange-400">{project.category}</p>
                  <h3 className="text-lg font-bold text-center leading-tight">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="bg-[#0B1F3A] py-20 px-6 text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Projects Completed", value: "250+", icon: <Briefcase /> },
            { label: "Happy Clients", value: "180+", icon: <Users /> },
            { label: "Ads Managed (PKR)", value: "5M+", icon: <Layout /> },
            { label: "Experience", value: "5 Years", icon: <Trophy /> },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-orange-500 mb-3">{stat.icon}</div>
              <h2 className="text-4xl font-black mb-1">{stat.value}</h2>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">Our Creative Process</h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Discover", desc: "Understanding your brand goals and market positioning." },
              { num: "02", title: "Strategy", desc: "Crafting a data-backed roadmap for visual success." },
              { num: "03", title: "Design", desc: "Creating pixel-perfect assets tailored to your audience." },
              { num: "04", title: "Scale", desc: "Launching campaigns and optimizing for maximum ROI." },
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <span className="text-5xl font-black text-gray-100 absolute -bottom-2 -right-2 group-hover:text-orange-500/10 transition-colors">{step.num}</span>
                <h4 className="text-lg font-bold text-[#0B1F3A] mb-3 relative z-10">{step.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-medium relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="bg-orange-500 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 tracking-tight uppercase">
            Ready to become our next success story?
          </h3>
          <Link 
            href="/contact" 
            className="inline-block bg-[#0B1F3A] text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#0B1F3A] transition-all"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </main>
  );
}