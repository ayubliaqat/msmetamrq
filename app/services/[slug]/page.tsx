"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { servicesData } from "@/data/services"; 
import { CheckCircle2, Zap, ShieldCheck, Trophy, ArrowRight } from "lucide-react";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) return notFound();

  return (
    <main className="bg-white min-h-screen">
      {/* 1. HERO SECTION - Professional & Focused */}
      <section className="bg-[#0B1F3A] pt-32 pb-20 text-center px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 inline-block border-b border-orange-500/30 pb-1">
            Professional Solutions
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {service.title} Services
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="#pricing" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              View Pricing
            </Link>
            <Link href="/contact" className="bg-transparent border border-gray-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white hover:text-[#0B1F3A] transition-all">
              Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. STRATEGY & EXPERTISE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-6">
              Strategic Approach to {service.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
              We leverage data-driven strategies and creative precision to ensure your brand achieves measurable growth. Our expertise is focused on delivering high-impact results that align with your business objectives.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {["Result Oriented", "Modern Design", "Market Analysis", "Support"].map((item) => (
                 <li key={item} className="flex items-center gap-2 text-[#0B1F3A] text-sm font-semibold">
                   <CheckCircle2 className="text-orange-500" size={18} />
                   {item}
                 </li>
               ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Technical Proficiency</h3>
            {service.skills.map((skill) => (
              <div key={skill.name} className="mb-6 last:mb-0">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">{skill.name}</span>
                  <span className="text-[#0B1F3A] font-bold text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-white h-1.5 rounded-full overflow-hidden shadow-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US - Smart Icon Grid */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-3">Why MS Visuals?</h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={24}/>, title: "Fast Turnaround", desc: "Optimized workflows ensuring your project is delivered on schedule." },
              { icon: <ShieldCheck size={24}/>, title: "Reliability", desc: "Transparent communication and professional standards in every task." },
              { icon: <Trophy size={24}/>, title: "Quality First", desc: "Premium output designed to outperform your market competitors." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-orange-500 mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold text-[#0B1F3A] mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION - PKR Based */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-2 uppercase">Service Packages</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Select the plan that fits your budget</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { plan: "Basic", price: "15,000", features: ["Logo Design", "3 Social Posts", "1 Revision"] },
            { plan: "Professional", price: "35,000", features: ["Full Brand Identity", "10 Social Posts", "3 Revisions", "Source Files"] },
            { plan: "Enterprise", price: "65,000", features: ["Complete Management", "Unlimited Revisions", "Video Ads", "24/7 Support"] }
          ].map((plan, index) => (
            <div key={index} className={`bg-white p-8 rounded-[2rem] border transition-all ${index === 1 ? 'border-orange-500 shadow-xl scale-105' : 'border-gray-100'}`}>
              <div className="mb-6">
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${index === 1 ? 'text-orange-500' : 'text-gray-400'}`}>{plan.plan}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-gray-500">PKR</span>
                  <span className="text-3xl font-bold text-[#0B1F3A]">{plan.price}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 pt-6 border-t border-gray-50">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-xs font-semibold">
                    <CheckCircle2 className="text-orange-500" size={14} /> {f}
                  </li>
                ))}
              </ul>
              <Link 
                href={`/contact?service=${service.slug}&plan=${plan.plan}`}
                className={`block text-center py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${index === 1 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-[#0B1F3A] text-white hover:bg-orange-500'}`}
              >
                Select Plan
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MINIMAL CTA */}
      <section className="bg-[#0B1F3A] py-16 px-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Need a custom quote for a large project?</h3>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#0B1F3A] px-8 py-3 rounded-full font-bold text-sm hover:bg-orange-500 hover:text-white transition-all">
          Get in Touch <ArrowRight size={16}/>
        </Link>
      </section>
    </main>
  );
}