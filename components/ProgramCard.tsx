"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Counting animation component
const CountUp = ({
  end,
  duration = 1500,
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

interface ProgramCardProps {
  title: string;
  subtitle?: string;
  description: string;
  ageRange: string;
  duration: string;
  capacity: string;
  rating: number;
  image: string;
  features: string[];
  href: string;
  index?: number;
}

const ProgramCard = ({
  title,
  subtitle,
  description,
  ageRange,
  duration,
  capacity,
  rating,
  image,
  features,
  href,
  index = 0,
}: ProgramCardProps) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={`${title} program at WonderMinds`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            placeholder="empty"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-gray-900">
              <CountUp end={rating} />
            </span>
          </div>

          {/* Age Range Badge */}
          <div className="absolute bottom-4 left-4 bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {ageRange}
          </div>
        </div>

        <CardHeader className="space-y-3">
          <CardTitle className="font-heading text-xl text-foreground group-hover:text-violet-600 transition-colors duration-200">
            {title}
          </CardTitle>
          {subtitle && (
            <div className="text-lg font-medium text-violet-600 italic">
              {subtitle}
            </div>
          )}
          <CardDescription className="text-muted-foreground leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col">
          <div className="space-y-4 flex-grow">
            {/* Program Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-violet-500" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="h-4 w-4 text-violet-500" />
                <span>{capacity}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">
                Key Features:
              </h4>
              <ul className="space-y-1">
                {(showAllFeatures ? features : features.slice(0, 3)).map(
                  (feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  )
                )}
              </ul>
              {features.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="text-violet-600 hover:text-violet-700 p-0 h-auto font-medium text-sm"
                >
                  {showAllFeatures ? (
                    <>
                      Show Less <ChevronUp className="ml-1 h-3 w-3" />
                    </>
                  ) : (
                    <>
                      +{features.length - 3} More Features{" "}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* CTA Button - Fixed at bottom */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4"
          >
            <Button asChild className="w-full btn-primary group/btn">
              <Link href={href}>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProgramCard;
