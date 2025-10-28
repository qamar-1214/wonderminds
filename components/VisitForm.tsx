"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  FileText,
  CheckCircle,
} from "lucide-react";

const VisitForm = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    childrenCount: "",
    area: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const timeSlots = [
    "Morning (9am - 12pm)",
    "Afternoon (12pm - 3pm)",
    "Evening (3pm - 6pm)",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send visit request");
      }

      setSubmitStatus("success");
      setFormData({
        parentName: "",
        email: "",
        phone: "",
        date: "",
        timeSlot: "",
        childrenCount: "",
        area: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error sending visit request:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send visit request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <Card className="bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
          <div className="h-full bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Parent Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Your Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="parentName"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <User className="h-4 w-4 text-purple-500" />
                        <span>Full Name *</span>
                      </label>
                      <Input
                        id="parentName"
                        name="parentName"
                        type="text"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                        placeholder="Enter your full name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <Mail className="h-4 w-4 text-purple-500" />
                        <span>Email *</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                        placeholder="Enter your email"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <Phone className="h-4 w-4 text-purple-500" />
                      <span>Phone Number *</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                      placeholder="Enter your phone number"
                    />
                  </motion.div>
                </motion.div>

                {/* Visit Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg shadow-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Visit Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="date"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <Calendar className="h-4 w-4 text-pink-500" />
                        <span>Preferred Date *</span>
                      </label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="timeSlot"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <Clock className="h-4 w-4 text-pink-500" />
                        <span>Preferred Time *</span>
                      </label>
                      <select
                        id="timeSlot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12 px-3"
                      >
                        <option value="">Select time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="childrenCount"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <User className="h-4 w-4 text-pink-500" />
                        <span>Number of Children</span>
                      </label>
                      <Input
                        id="childrenCount"
                        name="childrenCount"
                        type="number"
                        min="1"
                        value={formData.childrenCount}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                        placeholder="How many children?"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="area"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <MapPin className="h-4 w-4 text-pink-500" />
                        <span>Your Area/City</span>
                      </label>
                      <Input
                        id="area"
                        name="area"
                        type="text"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                        placeholder="Enter your area or city"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <FileText className="h-4 w-4 text-pink-500" />
                      <span>Additional Information</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl resize-none"
                      placeholder="Any questions or special requests?"
                    />
                  </motion.div>
                </motion.div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
                  >
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Visit Request Sent Successfully!
                      </h4>
                      <p className="text-sm text-green-700 mt-1">
                        Thank you! We'll contact you soon to confirm your visit
                        details.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl"
                  >
                    <p className="font-semibold text-red-800">
                      Error sending visit request
                    </p>
                    {errorMessage && (
                      <span className="text-red-700 text-sm mt-1 block">
                        {errorMessage}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="pt-6"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 hover:from-purple-600 hover:via-pink-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Request Visit</span>
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default VisitForm;
