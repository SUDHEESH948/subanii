import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Building2,
  Clock,
  CheckCircle2,
  Navigation as NavigationIcon,
} from "lucide-react";

// Corporate Brand Constants
const PRIMARY = "#C8102E"; // Corporate Red
const ACCENT = "#F4B400"; // Corporate Yellow / Gold

const COMPANY_NAME = "IFTAR FOOD INDUSTRIES";
const COMPANY_EMAIL = "contact@iftarfoodindustries.com";
const PHONE_NUMBER = "+91 9605777799";
const WHATSAPP_NUMBER = "917510116688";

const COMPANY_ADDRESS = [
  "Pump House Road",
  "Perunthallur PO",
  "VP Puram",
  "Tirur",
  "Malappuram (Dist)",
  "Kerala - 676102",
];

const ENQUIRY_TYPES = [
  "General Inquiry",
  "Bulk / Wholesale Order",
  "Product Distribution",
  "Custom Requirements",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    enquiryType: ENQUIRY_TYPES[0],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappMessage = `
*New Enquiry - ${COMPANY_NAME}*
------------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone || "Not provided"}
*Email:* ${formData.email}
*Type:* ${formData.enquiryType}

*Message:*
${formData.message}
    `.trim();

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(whatsappURL, "_blank");
    }, 400);
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2"
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: PRIMARY }}
            >
              WE ARE HERE TO HELP
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl"
          >
            Get In <span style={{ color: PRIMARY }}>Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600"
          >
            Have a question, bulk order requirement, or distributorship
            proposal? Our team is here to assist you promptly.
          </motion.p>

          <div
            className="mx-auto mt-6 h-1 w-20 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${PRIMARY} 50%, ${ACCENT} 50%)`,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Left Column: Company & Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between rounded-3xl bg-gray-900 p-8 text-white shadow-xl lg:col-span-2"
          >
            <div>
              <div className="flex items-center justify-between"></div>

              <h2 className="mt-6 text-2xl font-black tracking-tight">
                {COMPANY_NAME}
              </h2>

              <p className="mt-2 text-xs font-semibold text-yellow-400 uppercase tracking-widest">
                Subani Division
              </p>

              <p className="mt-4 text-sm leading-6 text-gray-300">
                Supplying premium quality food products with consistent
                freshness, hygiene standards, and reliable supply chains across
                Kerala and beyond.
              </p>

              <div className="mt-8 space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${ACCENT}25`, color: ACCENT }}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Plant & Office
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-300">
                      {COMPANY_ADDRESS.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${ACCENT}25`, color: ACCENT }}
                  >
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Direct Support & Inquiries
                    </p>
                    <a
                      href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                      className="mt-1 block text-sm font-bold text-white hover:text-yellow-400 transition-colors"
                    >
                      {PHONE_NUMBER}
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${ACCENT}25`, color: ACCENT }}
                  >
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Email Inquiries
                    </p>
                    <a
                      href={`mailto:${COMPANY_EMAIL}`}
                      className="mt-1 block text-sm font-bold text-white hover:text-yellow-400 transition-colors"
                    >
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>

                {/* Operating Schedule */}
                <div className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${ACCENT}25`, color: ACCENT }}
                  >
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Working Hours
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                      Mon - Sat: 9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp & Directions Actions */}
            <div className="mt-10 space-y-3">
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all"
                style={{ backgroundColor: PRIMARY }}
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </motion.a>

              <motion.a
                href="https://www.google.com/maps/search/?api=1&query=Pump+House+Road+Perunthallur+Tirur+Malappuram+Kerala+676102"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold text-white/90 backdrop-blur-md transition-all hover:bg-white/15"
              >
                <NavigationIcon className="h-4 w-4" style={{ color: ACCENT }} />
                Get Map Directions
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-gray-200/80 bg-white p-8 sm:p-10 shadow-sm lg:col-span-3"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-black tracking-tight text-gray-900">
                Send an Enquiry
              </h2>
              <p className="mt-1.5 text-sm text-gray-500">
                Complete the details below to dispatch your message directly to
                our sales and operations team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Mohammed Rasheed"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* Enquiry Type Dropdown */}
                <div>
                  <label
                    htmlFor="enquiryType"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    Enquiry Type
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
                  >
                    {ENQUIRY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Your Message / Specifications{" "}
                  <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about the quantity, delivery location, or questions you have..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-75"
                style={{ backgroundColor: PRIMARY }}
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Connecting..." : "Submit via WhatsApp"}
              </motion.button>

              {submitted && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center text-xs font-semibold text-emerald-800">
                  Enquiry opened in WhatsApp. Our team will get back to you
                  shortly!
                </div>
              )}

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                Direct routing with pre-formatted inquiry text.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
