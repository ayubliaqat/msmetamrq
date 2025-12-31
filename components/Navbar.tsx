"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideMenu, LucideX, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  {
    name: "Services",
    href: "/services", 
    submenu: [
      { name: "Graphic Design", href: "/services/graphic-design" },
      { name: "Meta Marketing", href: "/services/meta-marketing" },
      { name: "TikTok Shop", href: "/services/tiktok-shop" },
      { name: "Shopify Management", href: "/services/shopify-management" },
      { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
    ],
  },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 top-0 left-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={130}
            height={32}
            className="object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-10 text-[#0B1F3A] font-semibold text-sm uppercase tracking-wider">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group py-2">
              {link.submenu ? (
                <div className="flex items-center gap-1 cursor-pointer">
                  <Link href={link.href} className="hover:text-orange-500 transition-colors">
                    {link.name}
                  </Link>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  
                  {/* Dropdown Menu - Triggered by group-hover */}
                  <ul className="absolute left-0 top-full pt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                      {link.submenu.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block px-6 py-3 text-[13px] text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors capitalize tracking-normal"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </ul>
                </div>
              ) : (
                <Link href={link.href} className="hover:text-orange-500 transition-colors">
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden md:block">
          <Link href="/contact">
            <button className="bg-[#0B1F3A] text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-orange-500 transition-all">
              Let&apos;s Talk
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#0B1F3A]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <LucideX size={26} /> : <LucideMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 space-y-6">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.submenu ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Link 
                        href={link.href} 
                        className="text-xl font-bold text-[#0B1F3A]"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                      <button 
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-2 bg-gray-50 rounded-lg"
                      >
                        <ChevronDown className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileServicesOpen && (
                      <ul className="pl-4 space-y-3 border-l-2 border-orange-100 ml-1">
                        {link.submenu.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="block text-gray-600 font-medium"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-xl font-bold text-[#0B1F3A] block"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}