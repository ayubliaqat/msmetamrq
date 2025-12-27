// components/Footer.tsx
import Link from "next/link";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white py-8 mt-12 border-t border-gray-200">
      {/* Links row */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-4 md:space-y-0 items-center">
        {footerLinks.map((link) => (
          <Link key={link.name} href={link.href} className="relative group font-semibold">
            <span className="text-[#0B1F3A] transition-colors duration-300 group-hover:text-orange-400">
              {link.name}
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#F4A300] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm font-medium text-[#0B1F3A]">
        &copy; {new Date().getFullYear()} YourName. All rights reserved.
      </div>
    </footer>
  );
}
