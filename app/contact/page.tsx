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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import AppointmentForm from "@/components/AppointmentForm";

const Contact = () => {
  const quickActions = [
    {
      icon: Calendar,
      title: "Schedule a Visit",
      description: "Book a tour to see our facilities and meet our team.",
      href: "#appointment",
      color: "bg-violet-500 hover:bg-violet-600",
    },
    {
      icon: MessageCircle,
      title: "Ask a Question",
      description: "Get answers to your questions about our programs.",
      href: "#contact-form",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our admissions team.",
      href: "tel:+15551234567",
      color: "bg-green-500 hover:bg-green-600",
    },
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
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We'd love to hear from you! Whether you have questions about our
                programs, want to schedule a visit, or are ready to enroll your
                child, we're here to help.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-dotted opacity-20" />
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the best way to connect with us based on your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div
                      className={`mx-auto w-16 h-16 ${action.color} rounded-full flex items-center justify-center mb-4`}
                    >
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="font-heading text-xl">
                      {action.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-muted-foreground">
                      {action.description}
                    </CardDescription>
                    <Button asChild className="w-full">
                      <Link href={action.href}>
                        {action.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or want to learn more? Fill out the form below and
              we'll get back to you soon.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* Appointment Form */}
      <section id="appointment" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Schedule a Visit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to see our facilities in person? Fill out the form below to
              schedule a personalized tour and consultation.
            </p>
          </motion.div>

          <AppointmentForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  What are your operating hours?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We operate Monday through Friday from 7:00 AM to 6:00 PM, and
                  Saturday from 8:00 AM to 2:00 PM. We also offer extended care
                  options for working parents who need earlier drop-off or later
                  pick-up times. We are closed on Sundays and major holidays.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  Do you offer part-time programs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Yes! We offer both full-day and half-day programs for
                  preschool and kindergarten students. We also have flexible
                  scheduling options for working families, including early
                  morning drop-off and late afternoon pick-up.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  What is your student-to-teacher ratio?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We maintain excellent teacher-to-student ratios: 1:4 for
                  infants, 1:6 for toddlers, 1:8 for preschoolers, and 1:12 for
                  kindergarten and primary students. This ensures personalized
                  attention and quality care for every child.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  Do you provide meals and snacks?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Yes, we provide nutritious breakfast, lunch, and afternoon
                  snacks prepared fresh daily. We accommodate dietary
                  restrictions and allergies, and our menu is designed by a
                  certified nutritionist to meet children's developmental needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  How do I schedule a tour?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  You can schedule a tour by calling us at (555) 123-4567,
                  emailing info@wonderminds.com, or using our online contact
                  form. We offer tours Monday through Friday and can accommodate
                  your schedule. Tours typically last 30-45 minutes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="bg-background rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold text-foreground hover:text-green-600 transition-colors py-6">
                  What safety measures do you have in place?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Safety is our top priority. We have secure entry systems,
                  regular safety drills, background-checked staff, and
                  comprehensive health protocols. Our facilities are designed
                  with child safety in mind, including age-appropriate equipment
                  and secure outdoor play areas.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visit us at our conveniently located facility in the heart of
              Learning City.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-12 w-12 text-violet-600 mx-auto" />
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      123 Education Street, Learning City, LC 12345
                    </p>
                    <Button asChild className="btn-primary">
                      <Link
                        href="https://maps.google.com/?q=123+Education+Street+Learning+City+LC+12345"
                        target="_blank"
                      >
                        Get Directions
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                {/* Note: Replace with actual map when available */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-violet-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              Join the WonderMinds family today and give your child the gift of
              exceptional early childhood education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-violet-600 hover:bg-gray-100 group"
              >
                <Link href="#appointment">
                  Schedule a Visit
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
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

export default Contact;
