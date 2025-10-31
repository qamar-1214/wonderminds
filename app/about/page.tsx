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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Heart,
  Target,
  Users,
  Award,
  BookOpen,
  Shield,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of HD background images for auto-scrolling
  const backgroundImages = [
    "/images/about/about1.jpg",
    "/images/about/about2.jpg",
    "/images/about/about3.jpg",
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

  const values = [
    {
      icon: Heart,
      title: "Nurturing Care",
      description:
        "We provide a warm, loving environment where every child feels valued and supported in their learning journey.",
    },
    {
      icon: BookOpen,
      title: "Quality Education",
      description:
        "Our curriculum is designed to foster creativity, critical thinking, and a lifelong love of learning.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "We believe in building strong partnerships with families and creating a supportive community for all children.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Your child's safety and well-being are our top priorities in everything we do.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Principal & Founder",
      image: "/images/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg",
      bio: "With over 15 years of experience in early childhood education, Sarah founded WonderMinds to create a nurturing environment where every child can thrive.",
    },
    {
      name: "Michael Chen",
      role: "Head of Curriculum",
      image: "/images/cdc-UqTrGSohyCs-unsplash.jpg",
      bio: "Michael brings innovative teaching methods and a passion for developing age-appropriate learning programs that engage young minds.",
    },
    {
      name: "Emily Rodriguez",
      role: "Infant Care Specialist",
      image: "/images/changbok-ko-F8t2VGnI47I-unsplash.jpg",
      bio: "Emily specializes in infant development and creates safe, stimulating environments for our youngest learners.",
    },
    {
      name: "David Thompson",
      role: "Preschool Coordinator",
      image: "/images/drahomir-hugo-posteby-mach-n4y3eiQSIoc-unsplash.jpg",
      bio: "David leads our preschool program with a focus on social-emotional development and school readiness skills.",
    },
  ];

  const achievements = [
    { number: 1000, label: "Happy Students", suffix: "+" },
    { number: 15, label: "Years Experience", suffix: "+" },
    { number: 98, label: "Parent Satisfaction", suffix: "%" },
    { number: 4.9, label: "Average Rating" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
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
                placeholder="empty"
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-emerald-50/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                About WonderMinds
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We are passionate educators dedicated to nurturing young minds
                and creating a foundation for lifelong learning and success.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-dotted opacity-20" />
      </section>
      {/* Mission Section */}
      <section className="pt-8 pb-20 bg-background relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Mission Content - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-100">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  Our Mission
                </h2>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To provide exceptional early childhood education that nurtures
                each child&apos;s unique potential, fosters creativity and
                curiosity, and builds a strong foundation for lifelong learning
                and success.
              </p>
              <ul className="space-y-4">
                {[
                  "Individualized learning approaches",
                  "Safe and nurturing environment",
                  "Family-centered care",
                  "Holistic development focus",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-lg text-muted-foreground">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Mission Image - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/about4.jpg"
                  alt="Children learning together in classroom"
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder="empty"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-background relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Vision Image - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative lg:order-1 order-2"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/about2.jpg"
                  alt="Children playing and learning in outdoor environment"
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder="empty"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* Vision Content - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 lg:order-2 order-1"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-100">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  Our Vision
                </h2>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To be the leading early childhood education center that inspires
                young minds, empowers families, and creates a community where
                every child can discover their unique talents and reach their
                full potential.
              </p>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 bg-green-50 rounded-xl border border-green-100"
                >
                  <h3 className="font-heading text-lg font-semibold text-green-800 mb-2">
                    Future-Ready Learning
                  </h3>
                  <p className="text-green-700">
                    Preparing children for tomorrow&apos;s challenges through
                    innovative education.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="p-6 bg-green-50 rounded-xl border border-green-100"
                >
                  <h3 className="font-heading text-lg font-semibold text-green-800 mb-2">
                    Community Impact
                  </h3>
                  <p className="text-green-700">
                    Building stronger families and communities through quality
                    education.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beautiful Image Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Learning Environment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the beautiful spaces where children learn, play, and grow
              at WonderMinds
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Classroom Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-2xl shadow-lg h-64 sm:h-72 md:h-80 lg:h-[22rem] relative"
            >
              <Image
                src="/images/classroom1.jpg"
                alt="Modern classroom with children learning"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-heading text-xl font-bold">
                  Modern Classrooms
                </h3>
                <p className="text-sm">Spacious, bright learning spaces</p>
              </div>
            </motion.div>

            {/* Playground Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-2xl shadow-lg h-64 sm:h-72 md:h-80 lg:h-[22rem] relative"
            >
              <Image
                src="/images/gallery/gallery6.jpg"
                alt="Children playing in outdoor playground"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-heading text-xl font-bold">
                  Safe Playground
                </h3>
                <p className="text-sm">Secure outdoor play areas</p>
              </div>
            </motion.div>

            {/* Library Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-2xl shadow-lg h-64 sm:h-72 md:h-80 lg:h-[22rem] relative"
            >
              <Image
                src="/images/hero/hero7.jpg"
                alt="Children reading in library corner"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-heading text-xl font-bold">
                  Reading Corner
                </h3>
                <p className="text-sm">Cozy spaces for story time</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These values guide everything we do and shape the experience we
              provide for every child and family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full min-h-[300px] text-center hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="font-heading text-xl">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-center">
                    <CardDescription className="text-muted-foreground">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our dedicated team of educators and caregivers are passionate
              about nurturing young minds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {team.map((member, index) => {
              const colors = [
                {
                  border: "border-pink-300",
                  shadow: "shadow-pink-200",
                  bg: "bg-pink-50",
                },
                {
                  border: "border-blue-300",
                  shadow: "shadow-blue-200",
                  bg: "bg-blue-50",
                },
                {
                  border: "border-yellow-300",
                  shadow: "shadow-yellow-200",
                  bg: "bg-yellow-50",
                },
                {
                  border: "border-emerald-300",
                  shadow: "shadow-emerald-200",
                  bg: "bg-emerald-50",
                },
                {
                  border: "border-purple-300",
                  shadow: "shadow-purple-200",
                  bg: "bg-purple-50",
                },
                {
                  border: "border-teal-300",
                  shadow: "shadow-teal-200",
                  bg: "bg-teal-50",
                },
              ];
              const colorIndex = index % colors.length;
              const colorScheme = colors[colorIndex];

              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className={`h-full min-h-[400px] text-center hover:shadow-xl transition-all duration-300 flex flex-col ${colorScheme.border} ${colorScheme.shadow} ${colorScheme.bg}`}
                  >
                    <CardHeader className="flex-grow">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <CardTitle className="font-heading text-lg">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-green-600 font-medium">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-center">
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and the trust of
              our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white font-heading mb-2">
                  <CountUp
                    end={achievement.number}
                    suffix={achievement.suffix || ""}
                  />
                </div>
                <div className="text-violet-100 font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-theme-green to-theme-blue-light bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our programs, policies, and
              enrollment process.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  What age groups do you serve?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We serve children from 6 weeks to 12 years old, offering
                  programs for infants, toddlers, preschoolers, kindergarten,
                  and primary school students. Each age group has specialized
                  curriculum and care tailored to their developmental needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  What are your operating hours?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We operate Sunday through Thursday from 6:00 AM to 6:00 PM. We
                  also offer extended care options for working parents who need
                  earlier drop-off or later pick-up times. We are closed on
                  weekends and major holidays.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  What is included in the tuition?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Tuition includes all educational materials, nutritious meals
                  and snacks, outdoor play activities, art supplies, and access
                  to our learning resources. Additional fees may apply for
                  special programs, field trips, or extended care services.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  How do you ensure child safety?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Safety is our top priority. We have secure entry systems,
                  regular safety drills, background-checked staff, and
                  comprehensive health protocols. Our facilities are designed
                  with child safety in mind, including age-appropriate equipment
                  and secure outdoor play areas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  What is your teacher-to-student ratio?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We maintain excellent teacher-to-student ratios: 1:4 for
                  infants, 1:6 for toddlers, 1:8 for preschoolers, and 1:12 for
                  kindergarten and primary students. This ensures personalized
                  attention and quality care for every child.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  How can I schedule a tour?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  You can schedule a tour by calling us at +966 51 053 2513,
                  emailing info@wonderminds.com, or using our online contact
                  form. We offer tours Monday through Friday and can accommodate
                  your schedule. Tours typically last 30-45 minutes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a visit to see our facilities and meet our team. We'd
              love to show you how we can support your child&apos;s learning
              journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/contact">Schedule a Visit</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-secondary"
              >
                <Link href="/programs">View Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
