"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  X,
  MessageSquare,
  Instagram,
  Facebook,
  MapPin,
} from "lucide-react";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/966510532513",
      color: "bg-green-500 hover:bg-green-600",
      description: "+966 51 053 2513",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/wonderminds07/",
      color: "bg-pink-500 hover:bg-pink-600",
      description: "@wonderminds07",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/share/17E712AFgE/",
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Find us on Facebook",
    },
    {
      name: "Location",
      icon: MapPin,
      href: "https://maps.google.com/?q=26.352623,50.199097",
      color: "bg-violet-600 hover:bg-violet-700",
      description: "Ferdaws Mosque, Al Khobar, SA",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 2,
        }}
        className="relative"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isOpen
              ? "bg-violet-600 hover:bg-violet-700"
              : "bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600"
          }`}
          size="icon"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageSquare className="h-6 w-6 text-white" />
            )}
          </motion.div>
        </Button>

        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs text-white font-bold">4</span>
          </motion.div>
        )}
      </motion.div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-violet-500 p-4 text-white">
              <h3 className="font-heading font-semibold text-lg">
                Get in Touch
              </h3>
              <p className="text-violet-100 text-sm">
                Choose your preferred way to connect with us
              </p>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Social Links */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 text-sm">
                  Social Media
                </h4>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    >
                      <social.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {social.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {social.description}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChat;
