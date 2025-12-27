"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideMenu, LucideX } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="px-20 flex justify-between items-center">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link href="/">
            <Image
              src="/images/logo.png" // replace with your logo path
              alt="Logo"
              width={160} // adjust as needed
              height={40} // adjust as needed
              className="object-contain"
            />
          </Link>
        </div>
        {/* Desktop links */}
        <ul className="hidden md:flex space-x-8 text-gray-800 font-medium">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              <Link href={link.href} className="hover:text-orange-500">
                {link.name}
                {/* underline effect */}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Contact button (desktop) */}
        <div className="hidden md:block">
          <Link href="/contact">
            <button className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
              Contact
            </button>
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <LucideX size={24} /> : <LucideMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center py-4 space-y-4 text-gray-800 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-orange-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <button className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
                  Lets talk
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
