"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Instagram, Linkedin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { sendEmail } from "../actions/sendEmail";
import Link from "next/link";
export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleForm(formData: FormData) {
    setIsPending(true);
    setStatus("idle");
    const result = await sendEmail(formData);
    setIsPending(false);

    if (result.success) {
      setStatus("success");
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="bg-white min-h-screen pt-32 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. HEADER SECTION */}
        <section className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-[#0B1F3A] mb-6 tracking-tighter"
          >
            Let&apos;s start your <span className="text-orange-500 italic font-black">Success Story.</span>
          </motion.h1>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* 2. LEFT SIDE: CONTACT INFO (The "Missing" Part) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-8 uppercase tracking-tight">Contact Information</h2>
              <div className="space-y-8">
                {/* Email Item */}
                <div className="flex items-start gap-5 group">
                  <div className="bg-gray-50 p-4 rounded-2xl text-[#0B1F3A] group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-[#0B1F3A] font-bold text-lg">hello@msvisuals.com</p>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-start gap-5 group">
                  <div className="bg-gray-50 p-4 rounded-2xl text-[#0B1F3A] group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp / Call</p>
                    <p className="text-[#0B1F3A] font-bold text-lg">+92 300 1234567</p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-5 group">
                  <div className="bg-gray-50 p-4 rounded-2xl text-[#0B1F3A] group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Based In</p>
                    <p className="text-[#0B1F3A] font-bold text-lg">Lahore, Punjab, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h3 className="text-xs font-bold text-[#0B1F3A] mb-6 uppercase tracking-widest">Connect with us</h3>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={20} />, link: "#" },
                  { icon: <Linkedin size={20} />, link: "#" },
                  { icon: <MessageSquare size={20} />, link: "#" }
                ].map((item, i) => (
                  <Link key={i} href={item.link} className="w-12 h-12 flex items-center justify-center bg-[#0B1F3A] text-white rounded-full hover:bg-orange-500 transition-all shadow-lg hover:-translate-y-1">
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3. RIGHT SIDE: FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-gray-50 p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm"
          >
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold text-[#0B1F3A] mb-2 font-black">Message Sent!</h2>
                <p className="text-gray-500 mb-8">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setStatus("idle")} 
                  className="bg-[#0B1F3A] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-orange-500 transition-colors"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form id="contact-form" action={handleForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#0B1F3A] uppercase tracking-widest ml-1">Full Name</label>
                    <input name="name" required type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-orange-500 outline-none text-sm font-medium transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#0B1F3A] uppercase tracking-widest ml-1">Email Address</label>
                    <input name="email" required type="email" placeholder="email@example.com" className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-orange-500 outline-none text-sm font-medium transition-all shadow-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#0B1F3A] uppercase tracking-widest ml-1">Service Required</label>
                    <div className="relative">
                      <select name="service" className="w-full px-6 py-4 rounded-2xl bg-white outline-none text-sm font-medium appearance-none cursor-pointer border border-transparent focus:border-orange-500 shadow-sm">
                        <option>Graphic Design</option>
                        <option>Meta Marketing</option>
                        <option>Shopify Management</option>
                        <option>WhatsApp Marketing</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#0B1F3A] uppercase tracking-widest ml-1">Budget Range (PKR)</label>
                    <div className="relative">
                      <select name="budget" className="w-full px-6 py-4 rounded-2xl bg-white outline-none text-sm font-medium appearance-none cursor-pointer border border-transparent focus:border-orange-500 shadow-sm">
                        <option>15,000 - 35,000</option>
                        <option>35,000 - 65,000</option>
                        <option>65,000 - 100,000+</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#0B1F3A] uppercase tracking-widest ml-1">Project Brief</label>
                  <textarea name="message" required rows={4} placeholder="Tell me about your brand goals..." className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-orange-500 outline-none text-sm font-medium transition-all resize-none shadow-sm"></textarea>
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider bg-red-50 p-3 rounded-lg text-center">
                    Something went wrong. Please check your connection.
                  </p>
                )}

                <button 
                  disabled={isPending}
                  type="submit" 
                  className="w-full bg-[#0B1F3A] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-900/10 hover:shadow-orange-500/20"
                >
                  {isPending ? "SENDING..." : "SEND MESSAGE"} <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}