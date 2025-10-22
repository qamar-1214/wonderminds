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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
} from "lucide-react";

interface AppointmentData {
  parentName: string;
  parentEmail: string;
  phone: string;
  childName: string;
  childAge: string;
  area: string;
  address: string;
  preferredDate: string;
  notes: string;
}

const AppointmentForm = () => {
  const [formData, setFormData] = useState<AppointmentData>({
    parentName: "",
    parentEmail: "",
    phone: "",
    childName: "",
    childAge: "",
    area: "",
    address: "",
    preferredDate: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCalendly, setShowCalendly] = useState(false);

  const ageGroups = [
    "6 months - 1 year",
    "1-2 years",
    "2-3 years",
    "3-4 years",
    "4-5 years",
    "5-6 years",
    "6+ years",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      const response = await fetch("/api/send-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          parentName: "",
          parentEmail: "",
          phone: "",
          childName: "",
          childAge: "",
          area: "",
          address: "",
          preferredDate: "",
          notes: "",
        });
        // Show Calendly modal after successful submission
        setTimeout(() => setShowCalendly(true), 1000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error sending appointment request:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_LINK ||
    "https://calendly.com/wonderminds/consultation";

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Appointment Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <Card className="bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
          <div className="h-full bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Parent Information Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Parent Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="parentName"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <User className="h-4 w-4 text-purple-500" />
                        <span>Parent Name *</span>
                      </label>
                      <Input
                        id="parentName"
                        name="parentName"
                        type="text"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                        placeholder="Enter parent's full name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="parentEmail"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <Mail className="h-4 w-4 text-pink-500" />
                        <span>Email Address *</span>
                      </label>
                      <Input
                        id="parentEmail"
                        name="parentEmail"
                        type="email"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                        placeholder="Enter email address"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <Phone className="h-4 w-4 text-yellow-500" />
                      <span>Phone Number *</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 transition-all duration-300 rounded-xl h-12"
                      placeholder="Enter phone number"
                    />
                  </motion.div>
                </motion.div>

                {/* Child Information Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Child Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="childName"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <User className="h-4 w-4 text-pink-500" />
                        <span>Child's Name *</span>
                      </label>
                      <Input
                        id="childName"
                        name="childName"
                        type="text"
                        value={formData.childName}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl h-12"
                        placeholder="Enter child's name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="childAge"
                        className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                      >
                        <Clock className="h-4 w-4 text-teal-500" />
                        <span>Child's Age *</span>
                      </label>
                      <select
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 focus:border-teal-400 focus:ring-teal-200 transition-all duration-300 rounded-xl h-12 px-3 bg-white"
                      >
                        <option value="">Select age group</option>
                        {ageGroups.map((age) => (
                          <option key={age} value={age}>
                            {age}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Location Information Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Location Information
                    </h3>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="area"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <MapPin className="h-4 w-4 text-teal-500" />
                      <span>Area/City *</span>
                    </label>
                    <Input
                      id="area"
                      name="area"
                      type="text"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 focus:border-teal-400 focus:ring-teal-200 transition-all duration-300 rounded-xl h-12"
                      placeholder="Enter your area or city"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="address"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <MapPin className="h-4 w-4 text-yellow-500" />
                      <span>Address (Optional)</span>
                    </label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 transition-all duration-300 rounded-xl resize-none"
                      placeholder="Enter your full address (optional)"
                    />
                  </motion.div>
                </motion.div>

                {/* Additional Information Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Additional Information
                    </h3>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="preferredDate"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span>Preferred Date (Optional)</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full pl-10 border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-300 rounded-xl h-12"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="notes"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <FileText className="h-4 w-4 text-pink-500" />
                      <span>Additional Notes</span>
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-200 transition-all duration-300 rounded-xl resize-none"
                      placeholder="Tell us about your child's interests, any special needs, or questions you have..."
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
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-green-800 font-semibold block">
                        Great! Your appointment request has been submitted.
                      </span>
                      <span className="text-green-700 text-sm">
                        We'll open the scheduling calendar for you.
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
                        Sorry, there was an error submitting your request.
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
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="pt-6"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 hover:from-purple-600 hover:via-pink-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Request...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <span>Submit & Schedule</span>
                        <Calendar className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      {/* Calendly Modal */}
      <Dialog open={showCalendly} onOpenChange={setShowCalendly}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Schedule Your Consultation
            </DialogTitle>
            <DialogDescription>
              Choose a convenient time for your consultation with our team.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <iframe
              src={calendlyUrl}
              width="100%"
              height="600"
              frameBorder="0"
              title="Calendly Scheduling"
              className="rounded-lg"
            />
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                onClick={() => window.open(calendlyUrl, "_blank")}
                className="flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open in New Tab</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentForm;
