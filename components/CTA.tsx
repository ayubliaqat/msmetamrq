// components/CTA.tsx
"use client";
import { Button } from "./Button";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#0B1F3A] to-[#1F3C6B] flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
          Ready to Elevate Your Brand?
        </h2>
        <p className="text-gray-700 mb-8">
          Let’s create something amazing together. Whether it’s graphic design, digital campaigns, or Shopify management, we’ve got you covered.
        </p>
        <Button
          label="Get Started Today"
          variant="orange"
          onClick={() => alert("CTA Clicked")}
        />
      </div>
    </section>
  );
}
