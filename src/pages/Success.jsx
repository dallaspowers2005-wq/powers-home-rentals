import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, Phone, Mail, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SuccessPage() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const rentalId = urlParams.get("rental_id");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('pending_rental');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-500 via-lime-600 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .bubble-bg {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bubble-bg absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="bubble-bg absolute top-40 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="bubble-bg absolute bottom-32 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl" style={{ animationDelay: '2s' }}></div>
        <div className="bubble-bg absolute bottom-20 right-10 w-36 h-36 bg-white/10 rounded-full blur-2xl" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Loader2 className="w-16 h-16 md:w-20 md:h-20 text-lime-500 animate-spin" strokeWidth={3} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Processing Payment...
            </h2>
            <p className="text-lg md:text-xl text-white/80">
              Please wait while we confirm your payment
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative z-10 w-full max-w-2xl text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
              className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl"
            >
              <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-lime-500" strokeWidth={3} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-4"
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">
                Payment
                <br />
                Successful!
              </h1>

              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-2xl">
                <p className="text-2xl md:text-3xl font-bold text-teal-900 mb-3">
                  You're All Set!
                </p>
                <p className="text-lg md:text-xl text-teal-700 mb-4">
                  Your rental subscription is now active
                </p>
                <div className="inline-block bg-lime-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                  Payment Confirmed
                </div>
              </div>

              <div className="bg-teal-900/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 shadow-xl">
                <p className="text-xl md:text-2xl font-bold text-lime-400 mb-3">
                  What Happens Next?
                </p>
                <p className="text-base md:text-lg text-white leading-relaxed mb-3">
                  Our team will call you within <strong className="text-lime-400">24 hours</strong> to schedule delivery and installation
                </p>
                <p className="text-sm text-teal-200">
                  Check your email for payment confirmation!
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6">
                <p className="text-sm md:text-base text-white mb-4 font-semibold">
                  Need to contact us?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:928-830-3278"
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-teal-900 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg text-sm md:text-base"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    928-830-3278
                  </a>
                  <a
                    href="mailto:Powershomerentals@gmail.com"
                    className="flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg text-sm md:text-base"
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    Email Us
                  </a>
                </div>
              </div>

              <p className="text-white/80 text-sm md:text-base font-semibold mb-2">
                You can safely close this page now
              </p>

              {rentalId && (
                <p className="text-white/60 text-xs">
                  Confirmation ID: {rentalId}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
