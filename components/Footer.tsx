"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/966510532513",
      bgColor: "bg-green-500",
      hoverBgColor: "hover:bg-green-600",
      textColor: "text-white",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/wonderminds07/",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      hoverBgColor: "hover:from-purple-600 hover:to-pink-600",
      textColor: "text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/share/17E712AFgE/",
      bgColor: "bg-blue-600",
      hoverBgColor: "hover:bg-blue-700",
      textColor: "text-white",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const programs = [
    { name: "Infant Care", href: "/programs#infant" },
    { name: "Daycare", href: "/programs#daycare" },
    { name: "Preschool", href: "/programs#preschool" },
    { name: "Kindergarten", href: "/programs#kindergarten" },
    { name: "Primary", href: "/programs#primary" },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <Link href="/">
              <Image
                src="/worder minds Png logo.png"
                alt="WonderMinds Logo"
                width={1000}
                height={500}
                className="w-auto h-auto"
                quality={90}
                sizes="(max-width: 768px) 250px, 400px"
                loading="lazy"
                placeholder="empty"
              />
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Programs
            </h3>
            <ul className="space-y-1">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link
                    href={program.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Contact Info
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-violet-600" />
                <span className="text-sm text-muted-foreground">
                  Ferdaws Mosque, Al Khobar, SA
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-violet-600" />
                <span className="text-sm text-muted-foreground">
                  +966 51 053 2513, +966 50 876 9635
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-violet-600" />
                <span className="text-sm text-muted-foreground">
                  info@wonderminds.edu
                </span>
              </div>
            </div>
            <div className="pt-2">
              <h4 className="font-semibold text-sm text-foreground mb-2">
                Follow Us
              </h4>
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-2 rounded-lg ${social.bgColor} ${social.hoverBgColor} ${social.textColor} transition-all duration-300 shadow-md hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 pt-6 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} WonderMinds. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
