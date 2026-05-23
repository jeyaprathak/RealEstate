"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-xl border-t border-cyan-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-4">
              EliteEstates
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover your dream property with India's most trusted real estate platform.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/properties" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">→ Properties</Link></li>
              <li><Link href="/favorites" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">→ Favorites</Link></li>
              <li><Link href="/profile" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">→ Profile</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">→ FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">→ Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">→ Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 group">
                <FaFacebook className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 group">
                <FaTwitter className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 group">
                <FaInstagram className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 group">
                <FaLinkedin className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            © {new Date().getFullYear()} EliteEstates. Made with <FaHeart className="text-red-500 text-xs" /> for dream homes
          </p>
        </div>
      </div>
    </footer>
  );
}