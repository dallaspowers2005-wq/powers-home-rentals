
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, DollarSign, Loader2, CheckCircle, Truck, Wrench, Clock, Phone } from "lucide-react";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { format } from 'date-fns';

export default function Checkout() {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip_code: "",
    notes: ""
  });
  const [selectedPlan, setSelectedPlan] = useState("washer_dryer");
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (success) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [success]);

  const plans = {
    washer_dryer: {
      name: "Washer & Dryer Set",
      price: 59,
      appliance_type: "washer_dryer_set",
      description: "Complete laundry solution"
    },
    single_machine: {
      name: "Single Machine",
      price: 35,
      appliance_type: "single_machine",
      description: "Washer or dryer only"
    }
  };

  const currentPlan = plans[selectedPlan];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deliveryDate) {
      setError("Please select a delivery date");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      setSuccess(true);
      // Removed window.scrollTo here as it's now handled by the new useEffect

    } catch (err) {
      console.error("Application error:", err);
      setError("Unable to process your application. Please call us at 928-830-3278 for assistance.");
      setIsSubmitting(false);
    }
  };

  const isFieldFilled = (value) => {
    return value && value.toString().trim().length > 0;
  };

  if (success) {
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

        <motion.div 
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
              Thank You!
            </h1>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-2xl">
              <p className="text-2xl md:text-3xl font-bold text-teal-900 mb-3">
                We'll Be In Touch Soon! 🎉
              </p>
              <p className="text-lg md:text-xl text-teal-700 mb-4">
                Your rental inquiry has been received
              </p>
              <div className="inline-block bg-lime-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                ✓ Inquiry Submitted
              </div>
            </div>

            <div className="bg-teal-900/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 shadow-xl">
              <p className="text-xl md:text-2xl font-bold text-lime-400 mb-3">
                What Happens Next?
              </p>
              <p className="text-base md:text-lg text-white leading-relaxed">
                Our team will reach out to you as soon as we can to discuss your rental and answer any questions you may have.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6">
              <p className="text-sm md:text-base text-white mb-4 font-semibold">
                Need to contact us right away?
              </p>
              <a 
                href="tel:928-830-3278"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-teal-900 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg text-sm md:text-base"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                928-830-3278
              </a>
            </div>

            <p className="text-white/80 text-sm md:text-base font-semibold">
              ✓ You can safely close this page now
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900 py-8 md:py-12">
      <style>{`
        .rdp {
          --rdp-accent-color: #84cc16;
          color: white;
        }
        .rdp-caption {
          color: white;
          font-weight: bold;
        }
        .rdp-day {
          color: #5eead4;
          border-radius: 12px;
          margin: 2px;
        }
        .rdp-button {
          border-radius: 12px !important;
        }
        .rdp-day_selected {
          background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%) !important;
          color: white !important;
          font-weight: 900 !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(132, 204, 22, 0.5) !important;
          transform: scale(1.1) !important;
        }
        .rdp-day_selected:hover {
          background: linear-gradient(135deg, #65a30d 0%, #84cc16 100%) !important;
          transform: scale(1.15) !important;
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: rgba(132, 204, 22, 0.15) !important;
          border-radius: 12px !important;
        }
        .rdp-day_today {
          color: #fbbf24 !important;
          font-weight: bold;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Get Started
          </h1>
          <p className="text-base md:text-xl text-cyan-100 mb-4">
            Fill out your information and we'll reach out soon
          </p>
          <div className="inline-block bg-lime-500/20 border-2 border-lime-500 px-4 py-2 rounded-xl">
            <p className="text-lime-400 font-bold text-sm">Simple inquiry - no commitment required</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-2 border-teal-600/30 bg-teal-800/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-100 text-sm md:text-base">{error}</p>
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white mb-4">Select Your Plan</h2>
                    <div className="space-y-3">
                      <div 
                        className={`relative p-4 md:p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedPlan === 'washer_dryer' 
                            ? 'bg-lime-500/20 border-lime-500 shadow-lg shadow-lime-500/30' 
                            : 'bg-teal-900/50 border-teal-600 hover:border-teal-500'
                        }`}
                        onClick={() => setSelectedPlan('washer_dryer')}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPlan === 'washer_dryer' 
                                ? 'border-lime-500 bg-lime-500' 
                                : 'border-teal-400'
                            }`}>
                              {selectedPlan === 'washer_dryer' && (
                                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div>
                              <p className="text-lg md:text-xl font-bold text-white">
                                Washer & Dryer Set
                              </p>
                              <p className="text-sm text-teal-300">Complete laundry solution</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl md:text-3xl font-black text-lime-400">$59</p>
                            <p className="text-xs text-teal-300">per month</p>
                          </div>
                        </div>
                      </div>

                      <div 
                        className={`relative p-4 md:p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedPlan === 'single_machine' 
                            ? 'bg-lime-500/20 border-lime-500 shadow-lg shadow-lime-500/30' 
                            : 'bg-teal-900/50 border-teal-600 hover:border-teal-500'
                        }`}
                        onClick={() => setSelectedPlan('single_machine')}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPlan === 'single_machine' 
                                ? 'border-lime-500 bg-lime-500' 
                                : 'border-teal-400'
                            }`}>
                              {selectedPlan === 'single_machine' && (
                                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                              )}
                            </div>
                            <div>
                              <p className="text-lg md:text-xl font-bold text-white">
                                Single Machine
                              </p>
                              <p className="text-sm text-teal-300">Washer or dryer only</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl md:text-3xl font-black text-lime-400">$35</p>
                            <p className="text-xs text-teal-300">per month</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white mb-4">Your Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-teal-200 mb-2">
                          Full Name *
                        </label>
                        <Input
                          required
                          value={formData.customer_name}
                          onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                          placeholder="John Doe"
                          className={`h-11 md:h-12 text-base md:text-lg rounded-xl transition-all border-2 bg-teal-900/50 text-white placeholder:text-teal-400 ${
                            isFieldFilled(formData.customer_name) 
                              ? 'border-lime-500 bg-lime-500/10' 
                              : 'border-teal-600'
                          }`}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-teal-200 mb-2">
                            Email *
                          </label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className={`h-11 md:h-12 text-base md:text-lg rounded-xl transition-all border-2 bg-teal-900/50 text-white placeholder:text-teal-400 ${
                              isFieldFilled(formData.email) 
                                ? 'border-lime-500 bg-lime-500/10' 
                                : 'border-teal-600'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-teal-200 mb-2">
                            Phone *
                          </label>
                          <Input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(555) 123-4567"
                            className={`h-11 md:h-12 text-base md:text-lg rounded-xl transition-all border-2 bg-teal-900/50 text-white placeholder:text-teal-400 ${
                              isFieldFilled(formData.phone) 
                                ? 'border-lime-500 bg-lime-500/10' 
                                : 'border-teal-600'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white mb-4">Delivery Address</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-teal-200 mb-2">
                          Street Address *
                        </label>
                        <Input
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="123 Main Street"
                          className={`h-11 md:h-12 text-base md:text-lg rounded-xl transition-all border-2 bg-teal-900/50 text-white placeholder:text-teal-400 ${
                            isFieldFilled(formData.address) 
                              ? 'border-lime-500 bg-lime-500/10' 
                              : 'border-teal-600'
                          }`}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-teal-200 mb-2">
                            City *
                          </label>
                          <Input
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Maricopa"
                            className={`h-11 md:h-12 text-base md:text-lg rounded-xl transition-all border-2 bg-teal-900/50 text-white placeholder:text-teal-400 ${
                              isFieldFilled(formData.city) 
                                ? 'border-lime-500 bg-lime-500/10' 
                                : 'border-teal-600'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-teal-200 mb-2">
                            ZIP Code *
                          </label>
                          <Input
                            required
                            value={formData.zip_code}
                            onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                            placeholder="85138"
                            className={`h-11 md:h-12 text-base md:text-lg rounded-xl transition-all border-2 bg-teal-900/50 text-white placeholder:text-teal-400 ${
                              isFieldFilled(formData.zip_code) 
                                ? 'border-lime-500 bg-lime-500/10' 
                                : 'border-teal-600'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white mb-4">Preferred Delivery Date *</h2>
                    <div className={`bg-teal-900/70 rounded-xl p-4 border-2 flex justify-center transition-all ${
                      deliveryDate ? 'border-lime-500 bg-lime-500/10' : 'border-teal-600'
                    }`}>
                      <ShadCalendar
                        mode="single"
                        selected={deliveryDate}
                        onSelect={setDeliveryDate}
                        disabled={{ before: new Date() }}
                      />
                    </div>
                    {deliveryDate && (
                      <p className="text-lime-400 font-bold text-base md:text-lg mt-3 flex items-center gap-2 bg-lime-500/20 p-4 rounded-xl border-2 border-lime-500">
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                        Selected: {format(deliveryDate, 'MMMM d, yyyy')}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-teal-200 mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special instructions..."
                      className={`min-h-[100px] text-base md:text-lg rounded-xl resize-none transition-all border-2 bg-teal-900/50 text-white placeholder:text-teal-400 ${
                        isFieldFilled(formData.notes) 
                          ? 'border-lime-500 bg-lime-500/10' 
                          : 'border-teal-600'
                      }`}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold py-5 md:py-6 text-base md:text-lg rounded-xl shadow-lg shadow-lime-500/30 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 md:w-6 md:h-6 mr-2 animate-spin" /> Submitting...</>
                    ) : (
                      <><CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Submit Inquiry</>
                    )}
                  </Button>

                  <p className="text-center text-xs md:text-sm text-teal-300">
                    Questions? Call <a href="tel:928-830-3278" className="text-lime-400 hover:underline font-bold">928-830-3278</a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-2xl sticky top-24 border-2 border-teal-600/30 bg-teal-800/50 backdrop-blur-sm">
              <div className="bg-lime-500 p-4 md:p-6 text-teal-900">
                <h3 className="text-lg md:text-xl font-black">Plan Summary</h3>
              </div>
              <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
                <div>
                  <p className="text-xs md:text-sm text-teal-300 mb-1">Selected Plan</p>
                  <p className="text-base md:text-lg font-bold text-white">{currentPlan.name}</p>
                  <p className="text-xs text-teal-400 mt-1">{currentPlan.description}</p>
                </div>

                <div className="flex items-center gap-3 p-4 bg-lime-500/20 rounded-xl border-2 border-lime-500">
                  <DollarSign className="w-7 h-7 md:w-8 md:h-8 text-lime-400" />
                  <div>
                    <p className="text-xs md:text-sm text-lime-300">Monthly Rate</p>
                    <p className="text-xl md:text-2xl font-black text-lime-400">${currentPlan.price}</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs md:text-sm">
                  <div className="flex items-start gap-2">
                    <Truck className="w-4 h-4 md:w-5 md:h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                    <span className="text-teal-200">Free delivery</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wrench className="w-4 h-4 md:w-5 md:h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                    <span className="text-teal-200">Professional installation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                    <span className="text-teal-200">6-month minimum commitment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
