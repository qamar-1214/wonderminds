"use client";

import { motion } from "framer-motion";
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
  Baby,
  Heart,
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProgramCard from "@/components/ProgramCard";

const Programs = () => {
  const programs = [
    {
      title: "Infant & Toddler Care",
      subtitle: "Gentle Beginnings in a Safe Haven",
      description: "A nurturing start where your baby feels safe and loved.",
      ageRange: "6 Months – 2 Years",
      duration: "Full Day",
      capacity: "8 children",
      rating: 4.9,
      image: "/images/ryan-jacobson-cXUOQWdRV4I-unsplash.jpg",
      features: [
        "Secure baby rooms with soft lighting and baby-proofed play areas",
        "Bonding through touch, music, and sensory play",
        "Guided motor development: crawling, walking, hand-eye coordination",
        "Daily routine updates shared with parents",
      ],
      href: "/programs#infant",
    },
    {
      title: "Day Care",
      subtitle: "Safe. Caring. Nurturing.",
      description: "The ideal blend of care and early learning.",
      ageRange: "2 – 3 Years",
      duration: "Full Day",
      capacity: "12 children",
      rating: 4.8,
      image: "/images/unseen-studio-s9CC2SKySJM-unsplash.jpg",
      features: [
        "Structured daily routine (play, meals, nap, exploration)",
        "Sensory-rich classrooms with early literacy exposure",
        "First steps toward independence: self-feeding, tidying up, toilet training",
        "Gentle introduction to group play and social skills",
      ],
      href: "/programs#daycare",
    },
    {
      title: "Preschool",
      subtitle: "Where Curiosity Meets Creativity",
      description:
        "Children discover their love for learning through exploration.",
      ageRange: "3 – 4.5 Years",
      duration: "Half/Full Day",
      capacity: "16 children",
      rating: 4.9,
      image: "/images/zachary-keimig-nxJgmZfLcJI-unsplash.jpg",
      features: [
        "Phonics and pre-reading programs",
        "Counting, sorting, and number concepts through games",
        "Storytelling, puppets, role play, and arts & crafts",
        "Outdoor play and group activities to encourage teamwork",
      ],
      href: "/programs#preschool",
    },
    {
      title: "Kindergarten",
      subtitle: "Building Strong Foundations for School Success",
      description: "Prepared for school, prepared for life.",
      ageRange: "4.5 – 6 Years",
      duration: "Full Day",
      capacity: "18 children",
      rating: 4.9,
      image: "/images/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg",
      features: [
        "Academic readiness: reading, writing, math, and inquiry-based learning",
        "Early STEM activities, puzzles, and problem-solving tasks",
        "Teamwork and communication through projects and presentations",
        "Physical fitness: yoga, sports, balance & coordination games",
      ],
      href: "/programs#kindergarten",
    },
    {
      title: "Primary Foundation & Special Education",
      subtitle: "Every Child Deserves to Shine",
      description: "Empowering children to thrive in both academics and life.",
      ageRange: "6 – 10 Years",
      duration: "Full Day",
      capacity: "15 children",
      rating: 4.9,
      image: "/images/cdc-UqTrGSohyCs-unsplash.jpg",
      features: [
        "Academic support: homework help, reading fluency, math reinforcement",
        "Skill development: creative writing, science projects, public speaking",
        "Individualized Education Plans (IEPs) for special needs",
        "Speech, Occupational, and Behavioral Therapy support",
        "Support for Autism, ADHD, Learning Disorders",
        "Life Skills: independence, social manners, emotional regulation",
      ],
      href: "/programs#primary",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Small Class Sizes",
      description:
        "Low student-to-teacher ratios ensure personalized attention for every child.",
    },
    {
      icon: BookOpen,
      title: "Research-Based Curriculum",
      description:
        "Our programs are based on the latest research in early childhood development.",
    },
    {
      icon: Heart,
      title: "Nurturing Environment",
      description:
        "We create a warm, loving atmosphere where children feel safe to explore and learn.",
    },
    {
      icon: GraduationCap,
      title: "Qualified Staff",
      description:
        "Certified, experienced staff dedicated to early childhood care and learning.",
    },
  ];

  const schedule = [
    { time: "7:00 AM - 8:00 AM", activity: "Early Drop-off & Free Play" },
    { time: "8:00 AM - 8:30 AM", activity: "Breakfast" },
    { time: "8:30 AM - 9:00 AM", activity: "Circle Time & Morning Meeting" },
    { time: "9:00 AM - 10:30 AM", activity: "Learning Centers & Activities" },
    { time: "10:30 AM - 11:00 AM", activity: "Outdoor Play" },
    { time: "11:00 AM - 11:30 AM", activity: "Snack Time" },
    { time: "11:30 AM - 12:30 PM", activity: "Specialized Learning" },
    { time: "12:30 PM - 1:30 PM", activity: "Lunch" },
    { time: "1:30 PM - 3:00 PM", activity: "Quiet Time / Nap" },
    { time: "3:00 PM - 4:00 PM", activity: "Afternoon Activities" },
    { time: "4:00 PM - 5:00 PM", activity: "Free Play & Pick-up" },
    { time: "5:00 PM - 6:00 PM", activity: "Extended Care" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                Programs by Age Group
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Comprehensive early childhood education programs designed for
                children aged 6 months to 10 years.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Baby className="w-4 h-4 mr-2" />
                  Infants & Toddlers (6 Months – 2 Years)
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Day Care (2 – 3 Years)
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Preschool (3 – 4.5 Years)
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Kindergarten (4.5 – 6 Years)
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-dotted opacity-20" />
      </section>

      {/* Program Cards */}
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
              Age-Appropriate Learning
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each program is carefully designed to meet the developmental needs
              and learning styles of children at different stages of their early
              years.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {programs.map((program, index) => (
              <ProgramCard key={program.title} {...program} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Education & Therapies */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Special Education & Therapies
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                At WonderMinds, we believe every child is unique and capable of
                growth when provided with the right support. Our Special
                Education and Therapy programs serve children aged 2 to 10 years
                with developmental, learning, or behavioral challenges, ensuring
                they thrive academically, socially, and emotionally.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground">
                    Individualized Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Personalized learning plans tailored to each child's unique
                    needs and developmental stage.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground">
                    Therapeutic Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Speech, occupational, and behavioral therapy integrated into
                    daily learning activities.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground">
                    Emotional Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Building confidence, social skills, and emotional regulation
                    through supportive care.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Approach
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We combine evidence-based practices with personalized care to
              ensure every child reaches their full potential.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500 h-full flex flex-col">
                <div className="flex items-start space-x-4 flex-grow">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Holistic & Inclusive
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We integrate therapy with daily routines and learning
                      experiences, creating a seamless environment where every
                      child can thrive.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500 h-full flex flex-col">
                <div className="flex items-start space-x-4 flex-grow">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Evidence-Based Practices
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Using global best standards including ABA, PECS,
                      DIR-Floortime, TEACCH, and SCERTS methodologies.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-pink-500 h-full flex flex-col">
                <div className="flex items-start space-x-4 flex-grow">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Team Collaboration
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Therapists, teachers, and families work together for
                      maximum progress, ensuring consistent support across all
                      environments.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500 h-full flex flex-col">
                <div className="flex items-start space-x-4 flex-grow">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Personalized Growth
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Every child receives an Individualized Education Plan
                      (IEP) tailored to their unique strengths and specific
                      needs.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Program Features */}
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
              What Makes Us Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our unique approach combines proven educational methods with
              innovative techniques to create an exceptional learning
              experience.
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
                <Card className="h-[280px] text-center hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader className="flex-shrink-0 pb-4">
                    <div className="mx-auto w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="h-8 w-8 text-violet-600" />
                    </div>
                    <CardTitle className="font-heading text-xl h-[3rem] flex items-center justify-center">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-center">
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Daily Schedule
              </h2>
              <p className="text-lg text-muted-foreground">
                A typical day at WonderMinds is structured to provide the
                perfect balance of learning, play, and rest.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-600 to-violet-500 text-white">
                  <CardTitle className="font-heading text-xl text-center">
                    Sample Daily Schedule
                  </CardTitle>
                  <CardDescription className="text-violet-100 text-center">
                    Times may vary by age group and program
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {schedule.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-violet-600" />
                          <span className="font-medium text-foreground">
                            {item.time}
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          {item.activity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-violet-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              How to Enroll
            </h2>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              Getting started is easy! Follow these simple steps to join our
              WonderMinds family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Schedule a Visit",
                description:
                  "Book a tour to see our facilities and meet our team.",
                icon: Calendar,
              },
              {
                step: "2",
                title: "Complete Application",
                description:
                  "Fill out our enrollment form and submit required documents.",
                icon: BookOpen,
              },
              {
                step: "3",
                title: "Start Learning",
                description:
                  "Welcome to WonderMinds! Your child's journey begins.",
                icon: Star,
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white font-heading mb-2">
                  {step.step}
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-violet-100">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a visit today to see our programs in action and learn how
              we can support your child's educational journey.
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

export default Programs;
