"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    title: "Graphic Design",
    slug: "graphic-design",
    description:
      "Creating stunning visuals and brand assets that capture attention and leave a lasting impression.",
  },
  {
    title: "Meta Marketing",
    slug: "meta-marketing",
    description:
      "Running highly effective Meta ads campaigns to grow your business and reach your target audience.",
  },
  {
    title: "TikTok Shop Consulting",
    slug: "tiktok-shop",
    description:
      "Helping brands set up and optimize TikTok shops for maximum engagement and sales.",
  },
  {
    title: "Shopify Management",
    slug: "shopify-management",
    description:
      "Managing Shopify stores, product listings, and overall e-commerce strategies for growth.",
  },
  {
    title: "WhatsApp Marketing",
    slug: "whatsapp-marketing",
    description:
      "Engaging your audience and boosting conversions through professional WhatsApp marketing campaigns.",
  },
];

export default function ServicesPage() {
  return (
    <section className="py-32 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#0B1F3A] text-center mb-16">
          Our Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-[#0B1F3A] mb-4">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-6">{service.description}</p>
              <Link
                href={`/services/${service.slug}`}
                className="text-orange-400 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
