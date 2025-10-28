"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const servicesItems = [
    { name: "Speech & Language Therapy", href: "/services?service=speech" },
    { name: "Occupational Therapy", href: "/services?service=occupational" },
    { name: "Behavior & ABA", href: "/services?service=behavior" },
    { name: "Special Education Support", href: "/services?service=special-ed" },
    {
      name: "Counseling & Parent Support",
      href: "/services?service=counseling",
    },
    { name: "Assessments", href: "/services?service=assessments" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/">
              <Image
                src="/worder minds Png logo.png"
                alt="WonderMinds Logo"
                width={800}
                height={320}
                className="w-auto h-12 md:h-14"
                priority
                quality={90}
                sizes="(max-width: 768px) 150px, 200px"
                placeholder="empty"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesHovered(true)}
                    onMouseLeave={() => setIsServicesHovered(false)}
                  >
                    <Button
                      variant="ghost"
                      className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                      <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-gradient-to-r from-pink-300 to-teal-300 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
                    </Button>
                    {isServicesHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-lg shadow-lg z-50"
                      >
                        <div className="py-2">
                          {servicesItems.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    {item.name}
                    <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-gradient-to-r from-pink-300 to-teal-300 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button asChild className="btn-primary">
                <Link href="/booking">Book Appointment</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </motion.button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] flex flex-col h-full"
              >
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <div key={item.name}>
                        {item.hasDropdown ? (
                          <div className="space-y-2">
                            <div className="text-lg font-medium text-foreground py-2 text-center">
                              {item.name}
                            </div>
                            <div className="space-y-2">
                              {servicesItems.map((service) => (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  onClick={() => setIsOpen(false)}
                                  className="relative text-base text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-4 block group text-center rounded-lg hover:bg-muted/50"
                                >
                                  {service.name}
                                  <span className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-300 to-teal-300 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="relative text-lg font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 px-4 block group text-center rounded-lg hover:bg-muted/50"
                          >
                            {item.name}
                            <span className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-300 to-teal-300 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 p-4 border-t bg-background">
                  <Button asChild className="btn-primary w-full">
                    <Link href="/booking" onClick={() => setIsOpen(false)}>
                      Book Appointment
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
