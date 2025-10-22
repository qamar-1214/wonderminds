"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  User,
  MessageSquare,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 flex flex-col"
        >
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group flex-1"
          >
            <Card className="h-full min-h-[120px] bg-gradient-to-br from-pink-50 to-pink-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6 h-full flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
                  <p className="text-gray-600 text-sm">info@wonderminds.com</p>
                  <p className="text-gray-500 text-xs">
                    We'll respond within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group flex-1"
          >
            <Card className="h-full min-h-[120px] bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6 h-full flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
                  <p className="text-gray-600 text-sm">+92 300 123 4567</p>
                  <p className="text-gray-500 text-xs">Mon-Fri 9AM-6PM</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Message Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group flex-1"
          >
            <Card className="h-full min-h-[120px] bg-gradient-to-br from-teal-50 to-teal-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6 h-full flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Quick Response
                  </h3>
                  <p className="text-gray-600 text-sm">WhatsApp Available</p>
                  <p className="text-gray-500 text-xs">Instant support</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full"
        >
          <Card className="h-full bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            <div className="h-full bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
              <CardContent className="px-6 pb-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <User className="h-4 w-4 text-purple-500" />
                      <span>Full Name *</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <Mail className="h-4 w-4 text-pink-500" />
                      <span>Email Address *</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <Phone className="h-4 w-4 text-yellow-500" />
                      <span>Phone Number</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 transition-all duration-300 rounded-xl h-12"
                      placeholder="Enter your phone number"
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <MessageSquare className="h-4 w-4 text-teal-500" />
                      <span>Message *</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full border-2 border-gray-200 focus:border-teal-400 focus:ring-teal-200 transition-all duration-300 rounded-xl resize-none"
                      placeholder="Tell us about your child and how we can help..."
                    />
                  </motion.div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-green-800 font-semibold block">
                          Thank you! Your message has been sent successfully.
                        </span>
                        <span className="text-green-700 text-sm">
                          We'll get back to you within 24 hours.
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-red-800 font-semibold block">
                          Sorry, there was an error sending your message.
                        </span>
                        {errorMessage && (
                          <span className="text-red-700 text-sm mt-1 block">
                            {errorMessage}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="pt-4"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 hover:from-purple-600 hover:via-pink-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <span>Send Message</span>
                          <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
