import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatBot from "@/components/ChatBot";

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const existingMeta = document.querySelector('meta[name="google-site-verification"]');
    if (!existingMeta) {
      const meta = document.createElement('meta');
      meta.name = 'google-site-verification';
      meta.content = 'ERnc1Nz-dJsrpeHw2W8yUYyZ7EhkTh1pmdqgSfIyPjo';
      document.head.appendChild(meta);
    }
  }, []);

  const navLinks = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "How It Works", path: createPageUrl("HowItWorks") },
    { name: "Terms", path: createPageUrl("LiabilityAgreement") },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900">
      <style>{`
        :root {
          --teal-dark: #0f4c5c;
          --teal-medium: #14919b;
          --teal-light: #0fb8b0;
          --lime: #84cc16;
          --lime-dark: #65a30d;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-teal-900/95 backdrop-blur-md border-b border-teal-700/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center group">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68ef3c28265740cfbb0782bb/2747d0a5b_ChatGPTImageNov132025at12_29_41AM.png"
                alt="Powers Home Rentals"
                className="h-10 md:h-14 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-lime-400 bg-teal-800"
                      : "text-white hover:text-lime-400 hover:bg-teal-800/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to={createPageUrl("Checkout")}>
                <Button className="bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold px-6 py-2 rounded-xl shadow-lg shadow-lime-500/30 transform hover:scale-105 transition-all duration-200">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-teal-800 transition-colors text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-teal-700/30 bg-teal-900">
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                    isActive(link.path)
                      ? "text-lime-400 bg-teal-800"
                      : "text-white hover:bg-teal-800/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={createPageUrl("Checkout")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold py-3 rounded-xl shadow-lg mt-2">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* ChatBot */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-teal-950 text-white mt-20 border-t border-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68ef3c28265740cfbb0782bb/2747d0a5b_ChatGPTImageNov132025at12_29_41AM.png"
                alt="Powers Home Rentals"
                className="h-12 md:h-16 w-auto mb-4"
              />
              <p className="text-teal-300 leading-relaxed text-sm md:text-base">
                Making essential home appliances affordable and accessible through easy rental solutions.
              </p>
              <div className="mt-4 inline-block px-4 py-2 bg-teal-800 rounded-lg border border-teal-600">
                <p className="text-xs md:text-sm text-teal-200">Serving Maricopa, AZ</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-lime-400">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-teal-300 hover:text-lime-400 transition-colors text-sm md:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-lime-400">Get In Touch</h4>
              <div className="space-y-3">
                <a
                  href="tel:928-830-3278"
                  className="flex items-center gap-3 text-teal-300 hover:text-lime-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center group-hover:bg-lime-500 transition-colors">
                    <Phone className="w-5 h-5 group-hover:text-teal-900" />
                  </div>
                  <span className="font-semibold text-sm md:text-base">928-830-3278</span>
                </a>
                <a
                  href="mailto:Powershomerentals@gmail.com"
                  className="flex items-center gap-3 text-teal-300 hover:text-lime-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-teal-800 rounded-lg flex items-center justify-center group-hover:bg-lime-500 transition-colors">
                    <Mail className="w-5 h-5 group-hover:text-teal-900" />
                  </div>
                  <span className="break-all text-sm md:text-base">Powershomerentals@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-teal-800 mt-8 pt-8 text-center text-teal-400 text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} Powers Home Rentals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}