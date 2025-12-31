"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const portfolioItems = [
  { title: "Brand Identity Design", image: "/portfolio/brand1.jpg" },
  { title: "Social Media Campaign", image: "/portfolio/social1.jpg" },
  { title: "TikTok Shop Setup", image: "/portfolio/tiktok1.jpg" },
  { title: "Shopify Store Management", image: "/portfolio/shopify1.jpg" },
  // Add more items as needed
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#0B1F3A] text-center mb-12">
          My Portfolio
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold text-center px-4">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
