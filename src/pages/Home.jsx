import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Wrench, Shield, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const benefits = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "We bring the appliance right to your door at no extra cost"
    },
    {
      icon: Wrench,
      title: "Professional Installation",
      description: "Expert setup included - we handle everything for you"
    },
    {
      icon: Shield,
      title: "No Maintenance or Hidden Fees",
      description: "Transparent pricing with maintenance included in your rental"
    }
  ];

  return (
    <div className="overflow-hidden bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(10px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-40px) translateX(-15px) scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .bubble {
          animation: float 8s ease-in-out infinite;
          opacity: 0.4;
        }
        .bubble:nth-child(2) {
          animation: floatSlow 10s ease-in-out infinite;
          animation-delay: 1s;
        }
        .bubble:nth-child(3) {
          animation: float 12s ease-in-out infinite;
          animation-delay: 2s;
        }
        .bubble:nth-child(4) {
          animation: floatSlow 9s ease-in-out infinite;
          animation-delay: 3s;
        }
        .bubble:nth-child(5) {
          animation: float 11s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>

      {/* Hero Section with Bubbles */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Bubbles Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="bubble absolute top-20 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-2xl"></div>
          <div className="bubble absolute top-40 right-20 w-48 h-48 bg-teal-300 rounded-full blur-3xl"></div>
          <div className="bubble absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-500 rounded-full blur-2xl"></div>
          <div className="bubble absolute top-1/3 right-1/3 w-56 h-56 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="bubble absolute bottom-20 right-10 w-36 h-36 bg-cyan-300 rounded-full blur-2xl"></div>
          
          {/* Small bubbles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 md:w-4 md:h-4 bg-white/30 rounded-full"
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: -20,
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0
              }}
              transition={{ 
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-4 md:mb-6">
              Affordable
              <span className="block text-lime-400 mt-2">Washer & Dryer</span>
              <span className="block mt-2">Rentals</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-cyan-100 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Professional delivery & installation included. No large upfront costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
              <Link to={createPageUrl("Checkout")} className="w-full sm:w-auto">
                <Button className="w-full bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold px-8 md:px-10 py-5 md:py-6 text-base md:text-lg rounded-xl shadow-2xl shadow-lime-500/30 transform hover:scale-105 transition-all duration-200">
                  Get Started Today
                </Button>
              </Link>
              <a href="tel:928-830-3278" className="w-full sm:w-auto">
                <Button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 font-bold px-8 md:px-10 py-5 md:py-6 text-base md:text-lg rounded-xl transition-all duration-200">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>

            <div className="inline-block bg-lime-500 text-teal-900 px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-2xl">
              <p className="text-xs md:text-sm font-bold uppercase tracking-wide mb-1">Starting at</p>
              <p className="text-4xl md:text-5xl font-black">$59<span className="text-xl md:text-2xl">/mo</span></p>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,50 C300,100 900,0 1200,50 L1200,120 L0,120 Z" fill="#134e4a" opacity="0.5"></path>
            <path d="M0,70 C300,20 900,90 1200,40 L1200,120 L0,120 Z" fill="#134e4a"></path>
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 bg-teal-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg md:text-xl text-teal-300 max-w-2xl mx-auto">
              We make renting essential appliances simple and affordable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-teal-800/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border-2 border-teal-600/30 hover:border-lime-500/50 hover:shadow-2xl hover:shadow-lime-500/20 transition-all duration-300 text-center md:text-left"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-lime-500 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-lime-500/30 mx-auto md:mx-0">
                  <benefit.icon className="w-7 h-7 md:w-8 md:h-8 text-teal-900" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-sm md:text-base text-teal-200 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section with Bryan */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-teal-950 to-teal-900 relative">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="bubble absolute top-20 right-20 w-48 md:w-64 h-48 md:h-64 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="bubble absolute bottom-20 left-20 w-36 md:w-48 h-36 md:h-48 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 md:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-lime-500 rounded-3xl blur-xl opacity-20"></div>
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68ef3c28265740cfbb0782bb/5450449d0_Screenshot2025-10-14at112408PM.png"
                  alt="Bryan Powers - Owner"
                  className="relative rounded-3xl shadow-2xl border-4 border-lime-500/30 w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 text-center md:text-left"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">
                A Local Business
                <span className="block text-lime-400">You Can Trust</span>
              </h2>
              <p className="text-lg md:text-xl text-teal-200 mb-4 md:mb-6 leading-relaxed">
                "At Powers Home Rentals, we believe everyone deserves access to quality home appliances without the burden of large upfront costs."
              </p>
              <p className="text-base md:text-lg text-teal-300 mb-6 md:mb-8 leading-relaxed italic">
                - Bryan Powers, Founder
              </p>
              
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  "No hidden fees or surprises",
                  "Free professional delivery and installation",
                  "Responsive customer support",
                  "Quality appliances maintained to high standards"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 justify-center md:justify-start">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-lime-400 flex-shrink-0 mt-0.5" />
                    <span className="text-teal-100 text-sm md:text-lg text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-teal-700 via-cyan-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="bubble absolute top-10 left-10 w-32 md:w-40 h-32 md:h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="bubble absolute bottom-10 right-10 w-40 md:w-56 h-40 md:h-56 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-2xl text-cyan-100 mb-8 md:mb-10 leading-relaxed">
              Join the many Maricopa residents who trust Powers Home Rentals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link to={createPageUrl("Checkout")} className="w-full sm:w-auto">
                <Button className="w-full bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold px-10 md:px-12 py-5 md:py-6 text-lg md:text-xl rounded-xl shadow-2xl shadow-lime-500/30 transform hover:scale-105 transition-all duration-200">
                  Apply for Rental
                </Button>
              </Link>
              <Link to={createPageUrl("FinalizeRental")} className="w-full sm:w-auto">
                <Button className="w-full bg-white hover:bg-gray-50 text-teal-900 font-bold px-10 md:px-12 py-5 md:py-6 text-lg md:text-xl rounded-xl shadow-xl transition-all duration-200">
                  Finalize My Rental
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}