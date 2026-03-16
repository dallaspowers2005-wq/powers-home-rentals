import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/api/base44Client";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm here to help with any questions about our washer & dryer rentals. How can I assist you today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    "What are your rental prices?",
    "How does delivery work?",
    "What's included in the rental?",
    "How do I apply?"
  ];

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await apiCall('chat', {
        prompt: `You are a helpful customer service assistant for Powers Home Rentals, a washer and dryer rental company in Maricopa, AZ.

Company Information:
- Washer & Dryer Set: $59/month
- Single Machine: $35/month
- Free delivery and professional installation
- 6-month minimum commitment
- Serving Maricopa, AZ
- Phone: 928-830-3278
- Email: Powershomerentals@gmail.com
- No large upfront costs
- Maintenance included

How to Apply:
- Click the "Get Started" or "Apply for Rental" button at the top of the page
- Fill out the application form with your information
- We'll call within 24 hours to schedule delivery

User Question: ${message}

IMPORTANT: When asked how to get started or apply, simply tell them to click the "Get Started" or "Apply for Rental" button and fill out the form. If they prefer, they can call or text 928-830-3278.

Provide a friendly, helpful, and concise response (2-3 sentences max).`
      });

      const botMessage = {
        role: "assistant",
        content: response
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please call us at 928-830-3278 for immediate assistance!"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 shadow-2xl shadow-lime-500/50 flex items-center justify-center group"
            >
              <MessageCircle className="w-7 h-7 text-teal-900 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-96 h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-teal-900" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Powers Home Rentals</h3>
                  <p className="text-xs text-teal-100">Ask us anything!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-teal-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-teal-600 text-white rounded-br-sm'
                        : 'bg-white border-2 border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border-2 border-gray-200 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center mb-2">Quick questions:</p>
                  {quickQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(question)}
                      className="w-full text-left p-3 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl text-sm text-teal-800 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t-2 border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-xl border-2 border-gray-300 focus:border-teal-500"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-teal-600 hover:bg-teal-700 rounded-xl px-4"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Or call us: <a href="tel:928-830-3278" className="text-teal-600 font-bold hover:underline">928-830-3278</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}