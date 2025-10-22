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
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Heart,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Camera,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import ProgramCard from "@/components/ProgramCard";
import GalleryGrid from "@/components/GalleryGrid";
import FloatingChat from "@/components/FloatingChat";

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

const Home = () => {
  const featuredPrograms = [
    {
      title: "Infant Care",
      description:
        "Nurturing care for babies 6 weeks to 18 months with individualized attention.",
      ageRange: "6 weeks - 18 months",
      duration: "Full Day",
      capacity: "8 children",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        "Individualized feeding schedules",
        "Sensory play activities",
        "Music and movement",
        "Daily communication with parents",
      ],
      href: "/programs#infant",
    },
    {
      title: "Preschool",
      description:
        "Structured learning program preparing 3-4 year olds for kindergarten success.",
      ageRange: "3-4 years",
      duration: "Half/Full Day",
      capacity: "16 children",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        "Pre-literacy skills",
        "Math concepts",
        "Science exploration",
        "School readiness",
      ],
      href: "/programs#preschool",
    },
    {
      title: "Kindergarten",
      description:
        "Comprehensive program for 4-5 year olds with academic and social development focus.",
      ageRange: "4-5 years",
      duration: "Full Day",
      capacity: "18 children",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        "Reading and writing",
        "Mathematics",
        "Science and nature",
        "Character development",
      ],
      href: "/programs#kindergarten",
    },
  ];

  const galleryImages = [
    {
      id: "1",
      src: "/images/changbok-ko-F8t2VGnI47I-unsplash.jpg",
      alt: "Bright and colorful classroom with learning centers",
      title: "Learning Centers",
      description:
        "Our classrooms are designed to inspire creativity and exploration.",
    },
    {
      id: "2",
      src: "/images/drahomir-hugo-posteby-mach-n4y3eiQSIoc-unsplash.jpg",
      alt: "Outdoor playground with safe equipment",
      title: "Outdoor Playground",
      description: "Safe and engaging outdoor spaces for physical development.",
    },
    {
      id: "3",
      src: "/images/erika-fletcher-MZxqc6n9qCw-unsplash.jpg",
      alt: "Art studio with children creating artwork",
      title: "Art Studio",
      description: "Creative spaces for artistic expression and development.",
    },
    {
      id: "4",
      src: "/images/kimberly-farmer-lUaaKCUANVI-unsplash.jpg",
      alt: "Cozy library corner with books and reading nooks",
      title: "Library Corner",
      description: "A quiet space to foster a love of reading and literacy.",
    },
    {
      id: "5",
      src: "/images/laura-rivera-ArH3dtoDQc0-unsplash.jpg",
      alt: "Science exploration area with hands-on activities",
      title: "Science Exploration",
      description: "Hands-on science activities that spark curiosity.",
    },
    {
      id: "6",
      src: "/images/nathan-cima-Qw6wa96IvvQ-unsplash.jpg",
      alt: "Music room with instruments and children singing",
      title: "Music & Movement",
      description:
        "Musical instruments and movement activities for development.",
    },
  ];

  const features = [
    {
      icon: Heart,
      title: "Nurturing Care",
      description:
        "We provide a warm, loving environment where every child feels valued and supported.",
      image: "/images/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg",
    },
    {
      icon: BookOpen,
      title: "Quality Education",
      description:
        "Our curriculum fosters creativity, critical thinking, and a lifelong love of learning.",
      image: "/images/cdc-UqTrGSohyCs-unsplash.jpg",
    },
    {
      icon: Users,
      title: "Small Class Sizes",
      description:
        "Low student-to-teacher ratios ensure personalized attention for every child.",
      image: "/images/changbok-ko-F8t2VGnI47I-unsplash.jpg",
    },
    {
      icon: Star,
      title: "Experienced Teachers",
      description:
        "All our teachers are certified and have extensive experience in early childhood education.",
      image: "/images/drahomir-hugo-posteby-mach-n4y3eiQSIoc-unsplash.jpg",
    },
  ];

  const stats = [
    { number: 500, label: "Happy Students", suffix: "+" },
    { number: 15, label: "Years Experience", suffix: "+" },
    { number: 98, label: "Parent Satisfaction", suffix: "%" },
    { number: 4.9, label: "Average Rating" },
  ];

  return (
    <div>
      <Hero />
      <FloatingChat />

      {/* About Preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                About WonderMinds
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are passionate educators dedicated to nurturing young minds
                and creating a foundation for lifelong learning and success. Our
                mission is to provide exceptional early childhood education that
                fosters each child's unique potential.
              </p>
              <ul className="space-y-3">
                {[
                  "Individualized learning approaches",
                  "Safe and nurturing environment",
                  "Family-centered care",
                  "Holistic development focus",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-theme-green" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button asChild className="btn-primary">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/national-cancer-institute-N_aihp118p8-unsplash.jpg"
                  alt="Children learning at WonderMinds"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-theme-green font-heading">
                        <CountUp end={stat.number} suffix={stat.suffix || ""} />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose WonderMinds?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine proven educational methods with innovative techniques
              to create an exceptional learning experience for every child.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {/* Icon overlay */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-center">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive early childhood education programs designed to
              nurture, inspire, and prepare your child for a lifetime of
              learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program, index) => (
              <ProgramCard key={program.title} {...program} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="btn-primary">
              <Link href="/programs">
                View All Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              See Our Learning Environment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a peek at our vibrant classrooms, outdoor spaces, and the
              happy faces of our students engaged in learning activities.
            </p>
          </motion.div>

          <GalleryGrid
            images={galleryImages}
            title=""
            description=""
            showLightbox={true}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="btn-secondary">
              <Link href="/gallery">
                <Camera className="mr-2 h-4 w-4" />
                View Full Gallery
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-white text-opacity-90 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and the trust of
              our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white font-heading mb-2">
                  <CountUp end={stat.number} suffix={stat.suffix || ""} />
                </div>
                <div className="text-white text-opacity-90 font-medium">
                  {stat.label}
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
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked{" "}
              <span className="text-theme-green">Questions</span>
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
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-background rounded-lg border border-border px-6 transition-colors hover:bg-green-50 hover:border-green-200"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-theme-green transition-colors py-6">
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
                className="bg-background rounded-lg border border-border px-6 transition-colors hover:bg-green-50 hover:border-green-200"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-theme-green transition-colors py-6">
                  What are your operating hours?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We operate Monday through Friday from 7:00 AM to 6:00 PM. We
                  also offer extended care options for working parents who need
                  earlier drop-off or later pick-up times. We are closed on
                  weekends and major holidays.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-background rounded-lg border border-border px-6 transition-colors hover:bg-green-50 hover:border-green-200"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-theme-green transition-colors py-6">
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
                className="bg-background rounded-lg border border-border px-6 transition-colors hover:bg-green-50 hover:border-green-200"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-theme-green transition-colors py-6">
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
                className="bg-background rounded-lg border border-border px-6 transition-colors hover:bg-green-50 hover:border-green-200"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-theme-green transition-colors py-6">
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
                className="bg-background rounded-lg border border-border px-6 transition-colors hover:bg-green-50 hover:border-green-200"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-theme-green transition-colors py-6">
                  How can I schedule a tour?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  You can schedule a tour by calling us at (555) 123-4567,
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
            className="text-center space-y-6"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a visit to see our facilities and meet our team. We'd
              love to show you how we can support your child's learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary group">
                <Link href="/contact">
                  Schedule a Visit
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-secondary"
              >
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
