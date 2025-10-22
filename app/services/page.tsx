"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  MessageCircle,
  Activity,
  Brain,
  BookOpen,
  Heart,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Target,
  Clock,
  Hand,
  Zap,
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number;
          const startValue = 0;
          const endValue = typeof end === "number" ? end : 0;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(
              startValue + (endValue - startValue) * easeOutQuart
            );
            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="font-bold text-2xl">
      {count}
      {suffix}
    </span>
  );
};

const ServicesContent = () => {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service");

  // Detailed service information
  const detailedServices = {
    speech: {
      title: "Speech & Language Therapy",
      icon: MessageCircle,
      description:
        "Comprehensive speech and communication support for children with developmental needs. Our certified speech-language pathologists help children develop clear, confident communication skills.",
      detailedFeatures: [
        "Articulation & clarity training",
        "Vocabulary building & expressive speech",
        "Social communication & conversational skills",
        "Oral motor & feeding therapy",
        "Fluency and stuttering support",
        "Voice therapy and modulation",
        "Pragmatic language development",
        "Augmentative and alternative communication (AAC)",
      ],
      benefits: [
        {
          title: "Improved Communication",
          description:
            "Children develop clearer speech and better language skills",
          icon: MessageCircle,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Social Confidence",
          description: "Enhanced ability to interact with peers and adults",
          icon: Users,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Academic Success",
          description:
            "Better language skills support learning and development",
          icon: Star,
          color: "from-purple-500 to-purple-600",
        },
        {
          title: "Family Support",
          description:
            "Parents learn strategies to support speech development at home",
          icon: Heart,
          color: "from-pink-500 to-pink-600",
        },
      ],
      stats: [
        { label: "Children Helped", value: 150, suffix: "+" },
        { label: "Success Rate", value: 92, suffix: "%" },
        { label: "Sessions Completed", value: 3000, suffix: "+" },
        { label: "Parent Satisfaction", value: 98, suffix: "%" },
      ],
      image: "/images/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg",
      bgColor: "from-blue-50 to-sky-50",
      themeColor: "from-blue-400 to-blue-500",
    },
    occupational: {
      title: "Occupational Therapy",
      icon: Activity,
      description:
        "Developing essential motor skills and daily living capabilities for children with developmental needs. Our occupational therapists help children gain independence and confidence in their daily activities.",
      detailedFeatures: [
        "Fine motor skills (writing, grip, hand strength)",
        "Gross motor balance & coordination",
        "Sensory integration & regulation",
        "Daily living skills (dressing, feeding, toileting)",
        "Visual-motor integration",
        "Executive functioning skills",
        "Play and social interaction",
        "Adaptive equipment and assistive technology",
      ],
      benefits: [
        {
          title: "Motor Development",
          description:
            "Improved fine and gross motor skills for daily activities",
          icon: Hand,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Sensory Processing",
          description:
            "Better sensory integration and self-regulation abilities",
          icon: Zap,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Independence",
          description:
            "Enhanced ability to perform daily living tasks independently",
          icon: Target,
          color: "from-purple-500 to-purple-600",
        },
        {
          title: "Academic Success",
          description:
            "Improved skills that support learning and classroom participation",
          icon: Star,
          color: "from-pink-500 to-pink-600",
        },
      ],
      stats: [
        { label: "Children Helped", value: 120, suffix: "+" },
        { label: "Success Rate", value: 89, suffix: "%" },
        { label: "Sessions Completed", value: 2500, suffix: "+" },
        { label: "Parent Satisfaction", value: 96, suffix: "%" },
      ],
      image: "/images/cdc-UqTrGSohyCs-unsplash.jpg",
      bgColor: "from-emerald-50 to-teal-50",
      themeColor: "from-emerald-400 to-emerald-500",
    },
    behavior: {
      title: "Behavior & ABA Therapy",
      icon: Brain,
      description:
        "Evidence-based behavioral interventions for positive development. Our Board Certified Behavior Analysts (BCBAs) use Applied Behavior Analysis to help children develop appropriate behaviors and social skills.",
      detailedFeatures: [
        "Positive behavior support & reinforcement",
        "Reducing self-harm or tantrums",
        "Developing patience, turn-taking, and compliance",
        "Social skills & peer interaction",
        "Functional communication training",
        "Task analysis and skill building",
        "Behavior intervention plans (BIPs)",
        "Parent and caregiver training",
      ],
      benefits: [
        {
          title: "Positive Behavior",
          description: "Development of appropriate behaviors and social skills",
          icon: Shield,
          color: "from-purple-500 to-purple-600",
        },
        {
          title: "Emotional Regulation",
          description: "Better self-control and emotional management abilities",
          icon: Zap,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Social Skills",
          description: "Improved interaction and communication with peers",
          icon: Users,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Family Harmony",
          description: "Reduced stress and improved family relationships",
          icon: Heart,
          color: "from-pink-500 to-pink-600",
        },
      ],
      stats: [
        { label: "Children Helped", value: 180, suffix: "+" },
        { label: "Success Rate", value: 94, suffix: "%" },
        { label: "Sessions Completed", value: 4000, suffix: "+" },
        { label: "Parent Satisfaction", value: 97, suffix: "%" },
      ],
      image: "/images/changbok-ko-F8t2VGnI47I-unsplash.jpg",
      bgColor: "from-purple-50 to-violet-50",
      themeColor: "from-purple-400 to-purple-500",
    },
    "special-ed": {
      title: "Special Education Support",
      icon: BookOpen,
      description:
        "Personalized academic support for children with learning difficulties. Our special education specialists provide individualized instruction and support to help every child succeed academically.",
      detailedFeatures: [
        "Reading, writing, and math support for learning difficulties",
        "Strategies for ADHD, Dyslexia, and other learning disorders",
        "Individual & small-group sessions for personalized attention",
        "Assistive teaching methods (visual schedules, PECS)",
        "Curriculum modifications and accommodations",
        "Executive functioning support",
        "Social skills integration in academic settings",
        "Transition planning and support",
      ],
      benefits: [
        {
          title: "Academic Achievement",
          description: "Improved learning outcomes and academic performance",
          icon: BookOpen,
          color: "from-pink-500 to-pink-600",
        },
        {
          title: "Learning Strategies",
          description: "Development of effective study and learning techniques",
          icon: Target,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Confidence Building",
          description: "Increased self-esteem and academic confidence",
          icon: Star,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Family Partnership",
          description: "Collaborative approach with parents and caregivers",
          icon: Heart,
          color: "from-purple-500 to-purple-600",
        },
      ],
      stats: [
        { label: "Children Helped", value: 200, suffix: "+" },
        { label: "Success Rate", value: 88, suffix: "%" },
        { label: "Sessions Completed", value: 3500, suffix: "+" },
        { label: "Parent Satisfaction", value: 95, suffix: "%" },
      ],
      image: "/images/drahomir-hugo-posteby-mach-n4y3eiQSIoc-unsplash.jpg",
      bgColor: "from-pink-50 to-rose-50",
      themeColor: "from-pink-400 to-pink-500",
    },
    counseling: {
      title: "Counseling & Parent Support",
      icon: Heart,
      description:
        "Comprehensive family support and training programs. Our counselors and family support specialists work with parents and families to create positive, supportive environments for children's growth.",
      detailedFeatures: [
        "Parent training to continue therapy at home",
        "Family counseling to reduce stress and build positive routines",
        "Regular workshops on behavior, communication, and academic readiness",
        "Support groups for parents and caregivers",
        "Individual and family therapy sessions",
        "Crisis intervention and support",
        "Sibling support and education",
        "Community resource connections",
      ],
      benefits: [
        {
          title: "Family Harmony",
          description: "Improved family relationships and reduced stress",
          icon: Heart,
          color: "from-red-500 to-red-600",
        },
        {
          title: "Parent Confidence",
          description: "Enhanced parenting skills and confidence",
          icon: Users,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Support Network",
          description:
            "Connection with other families facing similar challenges",
          icon: Shield,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Home Success",
          description: "Better carryover of therapy goals to home environment",
          icon: Star,
          color: "from-purple-500 to-purple-600",
        },
      ],
      stats: [
        { label: "Families Helped", value: 300, suffix: "+" },
        { label: "Success Rate", value: 91, suffix: "%" },
        { label: "Workshops Conducted", value: 150, suffix: "+" },
        { label: "Parent Satisfaction", value: 96, suffix: "%" },
      ],
      image: "/images/erika-fletcher-MZxqc6n9qCw-unsplash.jpg",
      bgColor: "from-yellow-50 to-amber-50",
      themeColor: "from-yellow-400 to-yellow-500",
    },
    assessments: {
      title: "Comprehensive Assessments",
      icon: Target,
      description:
        "Professional evaluations to understand your child's strengths, needs, and developmental progress. Our assessment team provides comprehensive evaluations to guide treatment planning and measure progress.",
      detailedFeatures: [
        "Neuropsychological Assessments (attention, memory, learning)",
        "Developmental Screenings – speech, motor skills, social skills, and behavior",
        "Learning & Academic Assessments – reading, writing, math, attention, and memory",
        "Autism & ADHD Assessments – identifying patterns of communication, behavior, and focus",
        "School Readiness Evaluations – ensuring your child is prepared socially and academically for school",
        "Behavioral assessments and functional analysis",
        "Sensory processing evaluations",
        "Social-emotional assessments",
      ],
      benefits: [
        {
          title: "Clear Understanding",
          description:
            "Comprehensive picture of your child's strengths and needs",
          icon: Target,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Treatment Planning",
          description: "Evidence-based recommendations for intervention",
          icon: BookOpen,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Progress Tracking",
          description: "Objective measures to track developmental progress",
          icon: Star,
          color: "from-purple-500 to-purple-600",
        },
        {
          title: "Family Guidance",
          description: "Clear recommendations for home and school support",
          icon: Heart,
          color: "from-pink-500 to-pink-600",
        },
      ],
      stats: [
        { label: "Assessments Completed", value: 400, suffix: "+" },
        { label: "Accuracy Rate", value: 95, suffix: "%" },
        { label: "Follow-up Support", value: 100, suffix: "%" },
        { label: "Parent Satisfaction", value: 98, suffix: "%" },
      ],
      image: "/images/kimberly-farmer-lUaaKCUANVI-unsplash.jpg",
      bgColor: "from-teal-50 to-cyan-50",
      themeColor: "from-teal-400 to-teal-500",
    },
  };

  const services = [
    {
      key: "speech",
      title: "Speech & Language Therapy",
      icon: MessageCircle,
      description:
        "Comprehensive speech and communication support for children with developmental needs.",
      features: [
        "Articulation & clarity training",
        "Vocabulary building & expressive speech",
        "Social communication & conversational skills",
        "Oral motor & feeding therapy",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      key: "occupational",
      title: "Occupational Therapy",
      icon: Activity,
      description:
        "Developing essential motor skills and daily living capabilities.",
      features: [
        "Fine motor skills (writing, grip, hand strength)",
        "Gross motor balance & coordination",
        "Sensory integration & regulation",
        "Daily living skills (dressing, feeding, toileting)",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      key: "behavior",
      title: "Behavior & Applied Behavior Analysis (ABA)",
      icon: Brain,
      description:
        "Evidence-based behavioral interventions for positive development.",
      features: [
        "Positive behavior support & reinforcement",
        "Reducing self-harm or tantrums",
        "Developing patience, turn-taking, and compliance",
        "Social skills & peer interaction",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      key: "special-ed",
      title: "Special Education Support",
      icon: BookOpen,
      description:
        "Personalized academic support for children with learning difficulties.",
      features: [
        "Reading, writing, and math support for learning difficulties",
        "Strategies for ADHD, Dyslexia, and other learning disorders",
        "Individual & small-group sessions for personalized attention",
        "Assistive teaching methods (visual schedules, PECS)",
      ],
      color: "from-pink-500 to-pink-600",
    },
    {
      key: "counseling",
      title: "Counseling & Parent Support",
      icon: Heart,
      description: "Comprehensive family support and training programs.",
      features: [
        "Parent training to continue therapy at home",
        "Family counseling to reduce stress and build positive routines",
        "Regular workshops on behavior, communication, and academic readiness",
      ],
      color: "from-red-500 to-red-600",
    },
  ];

  const assessments = [
    {
      title: "Neuropsychological Assessments",
      description:
        "Comprehensive evaluation of attention, memory, and learning capabilities.",
      icon: Brain,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Developmental Screenings",
      description:
        "Speech, motor skills, social skills, and behavior assessments.",
      icon: Activity,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Learning & Academic Assessments",
      description: "Reading, writing, math, attention, and memory evaluations.",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Autism & ADHD Assessments",
      description:
        "Identifying patterns of communication, behavior, and focus.",
      icon: Target,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "School Readiness Evaluations",
      description:
        "Ensuring your child is prepared socially and academically for school.",
      icon: Star,
      color: "from-red-500 to-red-600",
    },
  ];

  const stats = [
    { label: "Children Helped", value: 500, suffix: "+" },
    { label: "Therapy Sessions", value: 10000, suffix: "+" },
    { label: "Parent Workshops", value: 200, suffix: "+" },
    { label: "Success Rate", value: 95, suffix: "%" },
  ];

  // Get the selected service data
  const currentService = selectedService
    ? detailedServices[selectedService as keyof typeof detailedServices]
    : null;

  return (
    <div>
      {/* Hero Section */}
      <section
        className={`relative flex items-center justify-center py-20 bg-gradient-to-br ${
          currentService
            ? currentService.bgColor
            : "from-green-50 to-emerald-50"
        }`}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-dotted opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {currentService ? (
            // Show specific service details
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {currentService.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span
                    className={`bg-gradient-to-r ${currentService.themeColor} bg-clip-text text-transparent`}
                  >
                    {currentService.title.split(" ").slice(-1)}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {currentService.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    Ages 2-10 Years
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    Certified Professionals
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    Individual Sessions
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="btn-primary">
                    <Link href="/contact">
                      Book Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/services">View All Services</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src={currentService.image}
                    alt={`Children participating in ${currentService.title.toLowerCase()} activities`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          ) : (
            // Show general services overview
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Comprehensive <span className="text-theme-green">Services</span>{" "}
                for Special Needs
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We provide evidence-based therapies and support services
                designed to help every child reach their full potential. Our
                multidisciplinary approach ensures comprehensive care for
                children with developmental, learning, and behavioral needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  Ages 2-10 Years
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  Evidence-Based
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  Family-Centered
                </Badge>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Service-specific detailed content */}
      {currentService && (
        <>
          {/* Service-specific Stats Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {currentService.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div
                      className={`bg-gradient-to-r ${currentService.themeColor} rounded-2xl p-6 text-white`}
                    >
                      <CountUp end={stat.value} suffix={stat.suffix} />
                      <p className="text-white text-opacity-90 mt-2 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Service-specific Features Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our{" "}
                  <span
                    className={`bg-gradient-to-r ${currentService.themeColor} bg-clip-text text-transparent`}
                  >
                    {currentService.title}
                  </span>{" "}
                  Services
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive {currentService.title.toLowerCase()} services
                  tailored to meet each child's unique needs.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {currentService.detailedFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Service-specific Benefits Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Benefits of{" "}
                  <span
                    className={`bg-gradient-to-r ${currentService.themeColor} bg-clip-text text-transparent`}
                  >
                    {currentService.title}
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover how our {currentService.title.toLowerCase()} services
                  can transform your child's development.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentService.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div
                          className={`mx-auto w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mb-4`}
                        >
                          <benefit.icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="font-heading text-xl">
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground">
                          {benefit.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Service-specific Process Section */}
          <section
            className={`py-16 bg-gradient-to-br ${currentService.bgColor}`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our{" "}
                  <span
                    className={`bg-gradient-to-r ${currentService.themeColor} bg-clip-text text-transparent`}
                  >
                    Process
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A structured approach to {currentService.title.toLowerCase()}{" "}
                  that ensures the best outcomes for your child.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${currentService.themeColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Assessment
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive evaluation to identify your child's specific
                    needs and develop a personalized treatment plan.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Therapy Sessions
                  </h3>
                  <p className="text-muted-foreground">
                    Regular sessions with our certified professionals using
                    evidence-based techniques and strategies.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-mint-500 to-mint-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    Progress & Support
                  </h3>
                  <p className="text-muted-foreground">
                    Ongoing monitoring, progress tracking, and family support to
                    ensure continued success.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Service-specific CTA Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Start {currentService.title}?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Contact us today to schedule an assessment and begin your
                  child's {currentService.title.toLowerCase()} journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="btn-primary">
                    <Link href="/contact">
                      Schedule Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/services">View All Services</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* General Services Overview - Only show when no specific service is selected */}
      {!currentService && (
        <>
          {/* Stats Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 text-white">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                      <p className="text-white text-opacity-90 mt-2 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our <span className="text-emerald-600">Services</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive therapy and support services tailored to meet
                  each child's unique needs and developmental goals.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="h-full flex flex-col"
                  >
                    <Link
                      href={`/services?service=${service.key}`}
                      className="h-full"
                    >
                      <Card className="h-full min-h-[400px] hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col">
                        <CardHeader className="flex-grow">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                            <service.icon className="h-8 w-8 text-white" />
                          </div>
                          <CardTitle className="font-heading text-xl text-center">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-center">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-shrink-0">
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-muted-foreground flex items-center space-x-2"
                              >
                                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Assessments Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Comprehensive{" "}
                  <span className="text-emerald-600">Assessments</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Professional evaluations to understand your child's strengths,
                  needs, and developmental progress.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-500">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${assessment.color} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <assessment.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="font-heading text-lg">
                              {assessment.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground">
                          {assessment.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Parent Assurance Section */}
          <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Parent <span className="text-emerald-600">Assurance</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  We know the journey can be overwhelming. That's why we promise
                  compassion, clarity, and consistency. Parents are always part
                  of the plan—we walk this journey together.
                </p>
                <p className="text-lg text-emerald-600 font-semibold italic">
                  Because when therapy is paired with love and science, every
                  child has the chance to flourish.
                </p>
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
                className="text-center"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Begin Your Child's Journey?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Contact us today to learn more about our services and how we
                  can support your child's development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="btn-primary">
                    <Link href="/contact">
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/programs">View Programs</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

const Services = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600"></div>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
};

export default Services;
