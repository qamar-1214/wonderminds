"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  Globe,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    childFullName: "",
    age: "",
    gender: "",
    nationality: "",
    languagesHome: "",
    languagesKnown: "",
    primaryConcerns: [] as string[],
    otherConcern: "",
    parentName: "",
    relation: "",
    contactNumber: "",
    email: "",
    preferredMode: "",
    preferredDays: [] as string[],
    preferredTimeSlot: "",
    previousDiagnosis: "",
    currentTherapy: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const primaryConcernOptions = [
    "Speech/Language Delay",
    "Behaviors / Meltdowns / Aggression",
    "Suspected Autism / Developmental Delay",
    "Learning / School Difficulties",
    "Attention / ADHD-like Concerns",
    "Social Interaction / Play Difficulties",
    "Sensory Issues (sound, touch, lights, etc.)",
    "Other",
  ];

  const daysOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  const timeSlotOptions = ["Morning", "Afternoon", "Evening"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const checkboxValue = checkbox.value;

      if (name === "primaryConcerns") {
        setFormData((prev) => ({
          ...prev,
          primaryConcerns: checkbox.checked
            ? [...prev.primaryConcerns, checkboxValue]
            : prev.primaryConcerns.filter((c) => c !== checkboxValue),
        }));
      } else if (name === "preferredDays") {
        setFormData((prev) => ({
          ...prev,
          preferredDays: checkbox.checked
            ? [...prev.preferredDays, checkboxValue]
            : prev.preferredDays.filter((d) => d !== checkboxValue),
        }));
      }
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send booking request");
      }

      setSubmitStatus("success");
      setFormData({
        childFullName: "",
        age: "",
        gender: "",
        nationality: "",
        languagesHome: "",
        languagesKnown: "",
        primaryConcerns: [],
        otherConcern: "",
        parentName: "",
        relation: "",
        contactNumber: "",
        email: "",
        preferredMode: "",
        preferredDays: [],
        preferredTimeSlot: "",
        previousDiagnosis: "",
        currentTherapy: "",
      });

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error sending booking request:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send booking request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pre-Booking{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Appointment Form
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              Neurodivergent Child Assessment / Consultation
            </p>
            <p className="text-lg text-muted-foreground">
              Thank you for your interest in booking an appointment with our
              Neurodevelopmental Team. Please complete the details below to help
              us schedule the most suitable consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="bg-white border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Child Information Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Child Information
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
                            htmlFor="childFullName"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                          >
                            <User className="h-4 w-4 text-purple-500" />
                            <span>Child's Full Name *</span>
                          </label>
                          <Input
                            id="childFullName"
                            name="childFullName"
                            type="text"
                            value={formData.childFullName}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                            placeholder="Enter child's full name"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="space-y-2">
                            <label
                              htmlFor="age"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Age *
                            </label>
                            <Input
                              id="age"
                              name="age"
                              type="number"
                              min="0"
                              max="18"
                              value={formData.age}
                              onChange={handleChange}
                              required
                              className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                              placeholder="Age"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="gender"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Gender *
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              required
                              className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12 px-3"
                            >
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <label
                            htmlFor="nationality"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                          >
                            <Globe className="h-4 w-4 text-purple-500" />
                            <span>Nationality *</span>
                          </label>
                          <Input
                            id="nationality"
                            name="nationality"
                            type="text"
                            value={formData.nationality}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                            placeholder="Nationality"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <label
                            htmlFor="languagesHome"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                          >
                            <MessageCircle className="h-4 w-4 text-purple-500" />
                            <span>Languages at Home *</span>
                          </label>
                          <Input
                            id="languagesHome"
                            name="languagesHome"
                            type="text"
                            value={formData.languagesHome}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                            placeholder="e.g., Urdu, English"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <label
                            htmlFor="languagesKnown"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                          >
                            <MessageCircle className="h-4 w-4 text-purple-500" />
                            <span>Languages Child Knows *</span>
                          </label>
                          <Input
                            id="languagesKnown"
                            name="languagesKnown"
                            type="text"
                            value={formData.languagesKnown}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                            placeholder="Languages child understands"
                          />
                        </motion.div>
                      </div>

                      {/* Primary Concerns */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                      >
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-purple-500" />
                          <span>Primary Concern (select one or more) *</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {primaryConcernOptions.map((concern) => (
                            <label
                              key={concern}
                              className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                name="primaryConcerns"
                                value={concern}
                                checked={formData.primaryConcerns.includes(
                                  concern
                                )}
                                onChange={handleChange}
                                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                              />
                              <span className="text-sm text-gray-700">
                                {concern}
                              </span>
                            </label>
                          ))}
                        </div>

                        {formData.primaryConcerns.includes("Other") && (
                          <Input
                            name="otherConcern"
                            type="text"
                            value={formData.otherConcern}
                            onChange={handleChange}
                            placeholder="Please specify other concern"
                            className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                          />
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Parent/Guardian Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg shadow-lg">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Parent / Guardian Details
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <label
                            htmlFor="parentName"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                          >
                            <User className="h-4 w-4 text-pink-500" />
                            <span>Parent/Guardian Name *</span>
                          </label>
                          <Input
                            id="parentName"
                            name="parentName"
                            type="text"
                            value={formData.parentName}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                            placeholder="Enter your full name"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <label
                            htmlFor="relation"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                          >
                            <User className="h-4 w-4 text-pink-500" />
                            <span>Relation to Child *</span>
                          </label>
                          <Input
                            id="relation"
                            name="relation"
                            type="text"
                            value={formData.relation}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                            placeholder="e.g., Mother, Father"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <label
                            htmlFor="contactNumber"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                          >
                            <Phone className="h-4 w-4 text-pink-500" />
                            <span>Contact Number (WhatsApp preferred) *</span>
                          </label>
                          <Input
                            id="contactNumber"
                            name="contactNumber"
                            type="tel"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                            placeholder="Enter WhatsApp number"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 1.0 }}
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <label
                            htmlFor="email"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                          >
                            <Mail className="h-4 w-4 text-pink-500" />
                            <span>Email *</span>
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
                      </div>
                    </motion.div>

                    {/* Appointment Preference */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Appointment Preference
                        </h3>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                      >
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-teal-500" />
                          <span>Preferred Mode *</span>
                        </label>
                        <div className="flex flex-col space-y-3">
                          <label className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer">
                            <input
                              type="radio"
                              name="preferredMode"
                              value="In-Person (Center Visit)"
                              checked={
                                formData.preferredMode ===
                                "In-Person (Center Visit)"
                              }
                              onChange={handleChange}
                              required
                              className="w-5 h-5 text-teal-600 border-gray-300 focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700">
                              In-Person (Center Visit)
                            </span>
                          </label>
                          <label className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer">
                            <input
                              type="radio"
                              name="preferredMode"
                              value="Online Tele-Consultation"
                              checked={
                                formData.preferredMode ===
                                "Online Tele-Consultation"
                              }
                              onChange={handleChange}
                              required
                              className="w-5 h-5 text-teal-600 border-gray-300 focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700">
                              Online Tele-Consultation
                            </span>
                          </label>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                      >
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-teal-500" />
                          <span>Preferred Day (tick any) *</span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {daysOptions.map((day) => (
                            <label
                              key={day}
                              className="flex items-center space-x-2 p-3 border-2 border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                name="preferredDays"
                                value={day}
                                checked={formData.preferredDays.includes(day)}
                                onChange={handleChange}
                                className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                              />
                              <span className="text-sm text-gray-700">
                                {day}
                              </span>
                            </label>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                      >
                        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-teal-500" />
                          <span>Preferred Time Slot *</span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {timeSlotOptions.map((slot) => (
                            <label
                              key={slot}
                              className="flex items-center space-x-2 p-3 border-2 border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="preferredTimeSlot"
                                value={slot}
                                checked={formData.preferredTimeSlot === slot}
                                onChange={handleChange}
                                required
                                className="w-5 h-5 text-teal-600 border-gray-300 focus:ring-teal-500"
                              />
                              <span className="text-sm text-gray-700">
                                {slot}
                              </span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Medical History */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Medical History
                        </h3>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <label
                          htmlFor="previousDiagnosis"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Has the child been previously diagnosed or assessed? *
                        </label>
                        <Textarea
                          id="previousDiagnosis"
                          name="previousDiagnosis"
                          value={formData.previousDiagnosis}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="w-full border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 transition-all duration-300 rounded-xl resize-none"
                          placeholder="Yes (mention diagnosis) or No / Not sure"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.7 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <label
                          htmlFor="currentTherapy"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Is the child currently taking any therapy or
                          medication? *
                        </label>
                        <Textarea
                          id="currentTherapy"
                          name="currentTherapy"
                          value={formData.currentTherapy}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="w-full border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 transition-all duration-300 rounded-xl resize-none"
                          placeholder="Yes — specify therapy/medication or No"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Information Note */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.8 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-lg"
                    >
                      <p className="text-sm text-gray-700">
                        <strong>Note:</strong> This is a pre-booking request.
                        Our team will review the form and contact you with the
                        earliest available appointment slot along with required
                        instructions.
                      </p>
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
                            Booking Request Sent Successfully!
                          </h4>
                          <p className="text-sm text-green-700 mt-1">
                            Thank you for your booking request. Our team will
                            review your information and contact you shortly with
                            the appointment details.
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
                          Error sending booking request
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
                      transition={{ duration: 0.5, delay: 1.9 }}
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
                            <span>Submit Booking Request</span>
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
      </section>
    </div>
  );
};

export default BookingPage;
