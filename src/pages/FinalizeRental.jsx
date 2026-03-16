import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { apiCall } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, DollarSign, FileText, Loader2, CheckCircle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalizeRental() {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip_code: "",
    agreed_to_terms: false
  });
  const [selectedPlan, setSelectedPlan] = useState("washer_dryer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = {
    washer_dryer: {
      name: "Washer & Dryer Set",
      price: 59,
      appliance_type: "washer_dryer_set",
      description: "Complete laundry solution",
      stripe_price_id: "price_1SRPPfLDxEDeSpeCUp1FnCMR"
    },
    single_machine: {
      name: "Single Machine",
      price: 35,
      appliance_type: "single_machine",
      description: "Washer or dryer only",
      stripe_price_id: "price_1STEF7LDxEDeSpeC9en1Prxo"
    }
  };

  const currentPlan = plans[selectedPlan];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreed_to_terms) {
      setError("Please agree to the billing terms and liability agreement");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const rentalId = crypto.randomUUID();

      await apiCall('send-email', {
        to: "deweyfellowship@gmail.com",
        from_name: "Powers Home Rentals",
        subject: `New Rental Payment - ${formData.customer_name}`,
        body: `
Customer is proceeding to payment!

Customer: ${formData.customer_name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.city}, AZ ${formData.zip_code}
Plan: ${currentPlan.name} - $${currentPlan.price}/month
Rental ID: ${rentalId}
Status: Pending Payment

Customer is being redirected to Stripe checkout.
`
      });

      // Save rental data to localStorage for the Success page
      localStorage.setItem('pending_rental', JSON.stringify({
        id: rentalId,
        customer_name: formData.customer_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip_code: formData.zip_code,
        appliance_type: currentPlan.appliance_type,
        monthly_rate: currentPlan.price,
      }));

      const response = await apiCall('create-checkout', {
        priceId: currentPlan.stripe_price_id,
        customerEmail: formData.email,
        customerName: formData.customer_name,
        rentalId: rentalId,
        successUrl: `${window.location.origin}${createPageUrl("Success")}?rental_id=${rentalId}`,
        cancelUrl: `${window.location.origin}${createPageUrl("FinalizeRental")}`
      });

      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("No checkout URL received");
      }

    } catch (err) {
      console.error("Payment error:", err);
      setError("Unable to process payment. Please call us at 928-830-3278 for assistance.");
      setIsSubmitting(false);
    }
  };

  const isFieldFilled = (value) => {
    return value && value.toString().trim().length > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Finalize Your Rental
          </h1>
          <p className="text-base md:text-xl text-cyan-100 mb-4">
            Complete your information and set up monthly payment
          </p>
          <div className="inline-block bg-lime-500/20 border-2 border-lime-500 px-4 py-2 rounded-xl">
            <p className="text-lime-400 font-bold text-sm">Secure payment powered by Stripe</p>
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

                  <div className="bg-yellow-600/20 border-2 border-yellow-500 rounded-xl p-4 md:p-6">
                    <h3 className="font-bold text-yellow-200 mb-3 flex items-center gap-2 text-sm md:text-base">
                      <FileText className="w-5 h-5" />
                      Terms & Agreement
                    </h3>
                    <p className="text-xs md:text-sm text-yellow-100 mb-4">
                      By checking the box below, you agree that the monthly rental rate for the {currentPlan.name.toLowerCase()} is ${currentPlan.price}.00. This rental requires a 6-month minimum commitment. You also agree to the full{" "}
                      <Link to={createPageUrl("LiabilityAgreement")} target="_blank" className="text-lime-400 hover:underline font-bold">
                        Liability Release Agreement
                      </Link>
                      , including releasing Powers Home Rentals from liability for property damage, agreeing to proper use of equipment, not removing or relocating the appliances, and accepting responsibility for damage due to misuse.
                    </p>
                    <div className={`flex items-start gap-3 p-4 bg-teal-900/50 rounded-lg transition-all ${
                      formData.agreed_to_terms 
                        ? 'border-2 border-lime-500 bg-lime-500/10' 
                        : 'border-2 border-teal-600'
                    }`}>
                      <Checkbox
                        id="terms"
                        checked={formData.agreed_to_terms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreed_to_terms: checked })}
                        className="mt-1 w-5 h-5 md:w-6 md:h-6 data-[state=checked]:bg-lime-500 data-[state=checked]:border-lime-500"
                      />
                      <label htmlFor="terms" className="text-xs md:text-sm font-semibold text-white cursor-pointer flex items-center gap-2">
                        {formData.agreed_to_terms && <CheckCircle className="w-5 h-5 text-lime-400" />}
                        I agree to the ${currentPlan.price}/month rental rate, 6-month commitment, and the full Liability Release Agreement
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold py-5 md:py-6 text-base md:text-lg rounded-xl shadow-lg shadow-lime-500/30 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 md:w-6 md:h-6 mr-2 animate-spin" /> Processing...</>
                    ) : (
                      <><CreditCard className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Proceed to Payment</>
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
                <h3 className="text-lg md:text-xl font-black">Rental Summary</h3>
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
                    <p className="text-xs md:text-sm text-lime-300">Monthly Payment</p>
                    <p className="text-xl md:text-2xl font-black text-lime-400">${currentPlan.price}</p>
                  </div>
                </div>

                <div className="text-xs md:text-sm space-y-2 text-teal-200">
                  <p>✓ Free delivery & installation</p>
                  <p>✓ 6-month minimum commitment</p>
                  <p>✓ Maintenance included</p>
                  <p>✓ Secure Stripe payment</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}