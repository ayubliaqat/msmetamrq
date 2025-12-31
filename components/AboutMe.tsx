"use client";
import { motion } from "framer-motion";

const skills = [
  { name: "Graphic Design", level: 90 },
  { name: "Meta Ads Management", level: 92 },
  { name: "TikTok Shop Consulting", level: 95 },
  { name: "Shopify Management", level: 88 },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* About Text */}
        <motion.div
          className="w-full md:w-1/2" // Explicitly full width on mobile
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} // Prevents re-triggering animation on scroll
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-[#0B1F3A] mb-6">About Me</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              I’m a creative digital marketer and graphic designer passionate about
              helping brands grow. With expertise in graphic design, Meta ads,
              TikTok shop, and Shopify management.
            </p>
            <p>
              My goal is to deliver professional, results-driven work that elevates
              your business and connects with your audience.
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="w-full md:w-1/2 space-y-8" // Increased width and vertical gap
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {skills.map((skill) => (
            <div key={skill.name} className="w-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-bold text-[#0B1F3A] tracking-tight">
                  {skill.name}
                </h3>
                <span className="text-sm font-bold text-orange-500">{skill.level}%</span>
              </div>
              
              {/* Skill Bar Container */}
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-orange-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}