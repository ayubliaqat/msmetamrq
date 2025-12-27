// components/Services.tsx
"use client";
import { FaPaintBrush, FaBullhorn, FaShopify, FaChartLine } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      icon: <FaPaintBrush className="text-orange-400 w-10 h-10" />,
      title: "Graphic Design",
      description:
        "Crafting visually stunning designs that reflect your brand identity and engage your audience.",
    },
    {
      icon: <FaBullhorn className="text-orange-400 w-10 h-10" />,
      title: "Ads Campaigns",
      description:
        "Running effective advertising campaigns across multiple platforms to grow your reach and conversions.",
    },
    {
      icon: <FaShopify className="text-orange-400 w-10 h-10" />,
      title: "Shopify Management",
      description:
        "Managing your Shopify store efficiently—from product listings to marketing strategies—for better sales.",
    },
    {
      icon: <FaChartLine className="text-orange-400 w-10 h-10" />,
      title: "Digital Growth",
      description:
        "Optimizing your online presence with SEO, social media, and analytics-driven strategies to boost growth.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 flex justify-center">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-xl p-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          We provide a complete suite of digital solutions to help your brand grow, attract customers, and stay ahead of the competition.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
