"use client";

import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

// Counting animation component
const CountUp = ({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;
    const endValue = parseFloat(end.toString());

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startValue + (endValue - startValue) * easeOutQuart;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {suffix === "+"
        ? `${Math.floor(count)}+`
        : suffix === "%"
        ? `${Math.floor(count)}%`
        : end % 1 !== 0
        ? count.toFixed(1)
        : Math.floor(count)}
    </span>
  );
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of HD background images for auto-scrolling
  const backgroundImages = [
    "/images/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg",
    "/images/cdc-UqTrGSohyCs-unsplash.jpg",
    "/images/changbok-ko-F8t2VGnI47I-unsplash.jpg",
    "/images/drahomir-hugo-posteby-mach-n4y3eiQSIoc-unsplash.jpg",
    "/images/erika-fletcher-MZxqc6n9qCw-unsplash.jpg",
    "/images/kimberly-farmer-lUaaKCUANVI-unsplash.jpg",
    "/images/laura-rivera-ArH3dtoDQc0-unsplash.jpg",
    "/images/nathan-cima-Qw6wa96IvvQ-unsplash.jpg",
    "/images/national-cancer-institute-N_aihp118p8-unsplash.jpg",
    "/images/note-thanun-hQXmjNi2baA-unsplash.jpg",
    "/images/priscilla-du-preez-ggeZ9oyI-PE-unsplash.jpg",
    "/images/ryan-jacobson-cXUOQWdRV4I-unsplash.jpg",
    "/images/unseen-studio-s9CC2SKySJM-unsplash.jpg",
    "/images/zachary-keimig-nxJgmZfLcJI-unsplash.jpg",
  ];

  // Auto-scroll background images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const stats = [
    { icon: Users, value: 500, label: "Happy Students", suffix: "+" },
    { icon: Star, value: 4.9, label: "Rating" },
    { icon: BookOpen, value: 15, label: "Years Experience", suffix: "+" },
  ];

  return (
    <section className="relative flex items-center justify-center py-20">
      {/* Auto-scrolling Background Images */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              x: 0, // Remove the sliding effect to prevent blank screens
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              opacity: { duration: 1.5 },
              x: { duration: 0 }, // Disable x animation
            }}
          >
            <Image
              src={image}
              alt={`Children learning and playing at WonderMinds - Image ${
                index + 1
              }`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-dotted opacity-20" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2]">
                Nurturing Young{" "}
                <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                  Minds
                </span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
                Where every child's potential is discovered, nurtured, and
                celebrated. Join our community of learners and watch your child
                thrive.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="btn-primary group">
                <Link href="/contact">
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-white/15">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white font-heading">
                    <CountUp end={stat.value} suffix={stat.suffix || ""} />
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image/Visual (Right Side) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-20"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/laura-rivera-ArH3dtoDQc0-unsplash.jpg"
                alt="Children at WonderMinds enjoying learning activities"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  console.log("Image failed to load:", e);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Excellence</div>
                  <div className="text-sm text-gray-600">Award Winning</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Community</div>
                  <div className="text-sm text-gray-600">500+ Families</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
