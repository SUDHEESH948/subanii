import HeroSection from "../components/Hero";
import FeaturesStrip from "../components/FeaturesStrip";
import Products from "../components/Products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";

const PRIMARY = "#C8102E";
const ACCENT = "#F4B400";

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesStrip />
      <Products />

      {/* Modern Wholesale & Partner CTA Strip */}
      <section className="bg-gray-900 py-16 px-6 lg:px-8 relative overflow-hidden text-white">
        <div
          className="absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: PRIMARY }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: ACCENT }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 mb-3">
              <Sparkles className="h-3.5 w-3.5" style={{ color: ACCENT }} />
              <span>Bulk Inquiries & Commercial Distribution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Looking for Wholesale Supply or Distributorship?
            </h2>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              Connect with our business desk for custom packaging, batch orders, and fast deliveries across Kerala.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 shrink-0"
          >
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-gray-950 shadow-lg transition-all"
                style={{ backgroundColor: ACCENT }}
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>

            <a href="tel:7510116699">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <PhoneCall className="h-4 w-4" style={{ color: ACCENT }} />
                <span>Call +91 75101 16699</span>
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Home;
