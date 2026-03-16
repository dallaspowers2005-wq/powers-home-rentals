import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Calendar, Truck, CheckCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Phone,
      title: "Choose Your Plan",
      description: "Fill out our simple rental application online or give us a call. We'll discuss your needs and confirm your $59/month rental plan."
    },
    {
      number: 2,
      icon: Calendar,
      title: "Schedule Delivery",
      description: "Pick a delivery date that works for you. We offer flexible scheduling to fit your busy life - typically within 3-5 business days."
    },
    {
      number: 3,
      icon: Truck,
      title: "We Deliver & Install",
      description: "Our professional team brings your washer & dryer right to your door and handles complete installation at no extra cost."
    },
    {
      number: 4,
      icon: CheckCircle,
      title: "Enjoy Hassle-Free Laundry",
      description: "Start using your appliances immediately! We'll be here if you need any support or maintenance during your rental period."
    }
  ];

  const faqs = [
    {
      question: "How long is the rental commitment?",
      answer: "We require a 6-month minimum commitment. After that, you can continue renting month-to-month."
    },
    {
      question: "What if the machine needs repairs?",
      answer: "Maintenance and repairs are included in your rental. Just contact us and we'll take care of it promptly at no additional cost."
    },
    {
      question: "Do I need good credit to rent?",
      answer: "We work with customers of all credit backgrounds. Give us a call at 928-830-3278 to discuss your situation."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve the Maricopa, AZ area. Contact us to confirm delivery to your specific location."
    },
    {
      question: "What happens after the 6-month commitment?",
      answer: "After the 6-month minimum, you can continue renting month-to-month or cancel with 30 days notice."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900">
      {/* Header */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-48 h-48 bg-cyan-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-300 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              How It Works
            </h1>
            <p className="text-lg md:text-xl text-cyan-100 max-w-2xl mx-auto">
              Getting your washer & dryer is simple and stress-free
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 md:py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 md:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden shadow-2xl border-2 border-teal-600/30 bg-teal-800/50 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Icon Section */}
                      <div className="bg-gradient-to-br from-lime-500 to-lime-600 p-8 md:p-12 flex flex-col items-center justify-center text-teal-900 md:w-1/3">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border-2 border-white/30">
                          <step.icon className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <div className="text-5xl md:text-6xl font-black opacity-20">
                          {step.number}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 md:p-12 md:w-2/3">
                        <h3 className="text-xl md:text-3xl font-black text-white mb-3 md:mb-4">
                          {step.title}
                        </h3>
                        <p className="text-base md:text-lg text-teal-200 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA After Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to={createPageUrl("Checkout")}>
              <Button className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold px-8 md:px-10 py-4 md:py-6 text-base md:text-lg rounded-xl shadow-lg shadow-lime-500/30 transform hover:scale-105 transition-all duration-200">
                Start Your Rental Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-teal-950 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-lime-500/30">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-teal-900" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-teal-300">
              Everything you need to know about our rental process
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-teal-800/50 backdrop-blur-sm border-2 border-teal-600/30 hover:border-lime-500/50 transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-bold text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-sm md:text-base text-teal-200 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 p-6 md:p-8 bg-teal-800/50 backdrop-blur-sm border-2 border-teal-600/30 rounded-2xl"
          >
            <h3 className="text-xl md:text-2xl font-black text-white mb-3">
              Still Have Questions?
            </h3>
            <p className="text-teal-200 mb-6 text-sm md:text-base">
              We're here to help! Reach out and we'll get back to you promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:928-830-3278">
                <Button className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold px-6 md:px-8 py-3 rounded-xl">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  928-830-3278
                </Button>
              </a>
              <Link to={createPageUrl("Contact")}>
                <Button className="w-full sm:w-auto bg-teal-700 hover:bg-teal-600 text-white border-2 border-teal-500 font-bold px-6 md:px-8 py-3 rounded-xl">
                  Send a Message
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}