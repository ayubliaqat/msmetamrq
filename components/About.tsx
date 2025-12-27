// components/About.tsx
"use client";
import { FaAward, FaUsers, FaRocket, FaLightbulb } from "react-icons/fa";

export default function About() {
  const highlights = [
    {
      icon: <FaAward className="text-orange-400 w-10 h-10" />,
      title: "Proven Expertise",
      description:
        "Years of experience delivering top-notch digital solutions and creative designs that help brands stand out.",
    },
    {
      icon: <FaUsers className="text-orange-400 w-10 h-10" />,
      title: "Client-Focused Approach",
      description:
        "We prioritize your goals and vision, ensuring every project aligns perfectly with your brand and audience.",
    },
    {
      icon: <FaRocket className="text-orange-400 w-10 h-10" />,
      title: "Results Driven",
      description:
        "Our strategies boost engagement, conversions, and growth across all digital channels.",
    },
    {
      icon: <FaLightbulb className="text-orange-400 w-10 h-10" />,
      title: "Innovative Solutions",
      description:
        "We combine creativity and technology to deliver unique designs, campaigns, and online experiences.",
    },
  ];

  return (
    <section className="py-24 bg-gray-100 flex flex-col items-center">
      {/* Heading above the card */}
      <div className="text-center mb-12 px-6 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Why Choose MS Visuals
        </h2>
        <p className="text-gray-600">
          We blend creativity, strategy, and technology to deliver digital solutions that drive results and make your brand unforgettable.
        </p>
      </div>

      {/* Single large card containing the grid */}
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-xl p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
