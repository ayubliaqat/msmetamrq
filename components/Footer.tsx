import Link from "next/link";
import { 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook, 
  FaWhatsapp 
} from "react-icons/fa";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        {/* Single Row Navigation */}
        <nav className="w-full mb-10">
          <ul className="flex flex-row justify-center items-center flex-wrap gap-x-8 gap-y-4 text-[12px] md:text-sm font-bold uppercase tracking-[0.15em]">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="relative group block"
                >
                  <span className="text-[#0B1F3A] transition-colors duration-300 group-hover:text-orange-500">
                    {link.name}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons Row with Meta & WhatsApp */}
        <div className="flex items-center justify-center gap-8 text-[#0B1F3A] mb-8">
          <Link 
            href="https://facebook.com/yourprofile" 
            aria-label="Facebook" 
            className="hover:text-[#1877F2] transition-all hover:-translate-y-1"
          >
            <FaFacebook size={20} />
          </Link>
          <Link 
            href="https://instagram.com/yourprofile" 
            aria-label="Instagram" 
            className="hover:text-[#E4405F] transition-all hover:-translate-y-1"
          >
            <FaInstagram size={20} />
          </Link>
          <Link 
            href="https://twitter.com/yourprofile" 
            aria-label="Twitter" 
            className="hover:text-[#1DA1F2] transition-all hover:-translate-y-1"
          >
            <FaTwitter size={20} />
          </Link>
          <Link 
            href="https://linkedin.com/in/yourprofile" 
            aria-label="LinkedIn" 
            className="hover:text-[#0A66C2] transition-all hover:-translate-y-1"
          >
            <FaLinkedin size={20} />
          </Link>
          <Link 
            href="https://wa.me/yourphonenumber" 
            aria-label="WhatsApp" 
            className="hover:text-[#25D366] transition-all hover:-translate-y-1"
          >
            <FaWhatsapp size={22} />
          </Link>
        </div>

        {/* Copyright & Branding Line */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} MS Visuals
          </p>
          <div className="h-[2px] w-12 bg-orange-400/30 rounded-full"></div>
        </div>
      </div>
    </footer>
  );
}