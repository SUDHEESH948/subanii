import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Smartphone,
  Building2,
  ShoppingBag,
  Store,
  Factory,
  Utensils,
  Truck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import koolathLogo from '../assets/logo/koolath.png';
import subaniLogo from '../assets/image.png';
import wholesaleLogo from '../assets/logo/wholesale.png';
import appLogo from '../assets/logo/log.png';
/* ============================================================
   BRAND COLORS
============================================================ */

const PRIMARY = "#FF3D57";
const PRIMARY_DARK = "#D92B43";
const ACCENT = "#FFCA00";
const ACCENT_DARK = "#E5A900";
const TEXT = "#171719";

/* ============================================================
   GOOGLE PLAY LINKS
============================================================ */

const SUBANI_APP_URL =
  "https://play.google.com/store/apps/details?id=com.datacubeinfo.subani";

const SUBANI_WHOLESALE_APP_URL =
  "https://play.google.com/store/apps/details?id=com.datacubeinfo.subani_wholesale";

/* ============================================================
   COMPANIES DATA (KOOLATH GROUP ECOSYSTEM)
============================================================ */

const COMPANIES = [
  {
    id: "milling",
    name: "Koolath Milling Company",
    shortName: "Koolath Milling",
    tag: "Processing & Production",
    icon: Factory,
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80",
    badge: "Since 1985",
  },
  {
    id: "iftar",
    name: "Iftar Food Industries",
    shortName: "Iftar Food",
    tag: "Culinary & Packaged Foods",
    icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
    badge: "Quality First",
  },
  {
    id: "enterprises",
    name: "Koolath Enterprises",
    shortName: "Koolath Logistics",
    tag: "Commercial Trading & Supply",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    badge: "B2B Logistics",
  },
  {
    id: "supermarket",
    name: "Subani Koolath Supermarket",
    shortName: "Subani Mart",
    tag: "Retail & Daily Provisions",
    icon: Store,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    badge: "Retail Mart",
  },
  {
    id: "archend",
    name: "Archend Builders & Events",
    shortName: "Archend Events",
    tag: "Architecture & Luxury Celebrations",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    badge: "Premium Design",
  },
];

/* ============================================================
   HERO COMPONENT
============================================================ */

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3D Card tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 140, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 140, damping: 22 });

  const rotateX = useTransform(smoothY, [-200, 200], [5, -5]);
  const rotateY = useTransform(smoothX, [-200, 200], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Auto slide runner
  useEffect(() => {
    if (COMPANIES.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % COMPANIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (COMPANIES.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % COMPANIES.length);
  };

  const handlePrev = () => {
    if (COMPANIES.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + COMPANIES.length) % COMPANIES.length);
  };

  const activeCompany = COMPANIES[currentIndex] || COMPANIES[0];
  const IconComponent = activeCompany?.icon || Sparkles;

  return (
    <section className="relative min-h-[calc(100vh-76px)] w-full overflow-hidden bg-gradient-to-b from-white via-rose-50/20 to-amber-50/15 py-8 sm:py-12 lg:py-16 flex items-center text-[#171719]">
      {/* Ambient Lighting Blurs */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full blur-[140px] opacity-15"
        style={{ backgroundColor: PRIMARY }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full blur-[140px] opacity-15"
        style={{ backgroundColor: ACCENT }}
        aria-hidden="true"
      />

      {/* Top Accent Gradient Line */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${PRIMARY} 0%, ${ACCENT} 50%, ${PRIMARY} 100%)`,
        }}
      />

      {/* Main Grid Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid items-center gap-8 md:grid-cols-12 lg:gap-12">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full md:col-span-6 lg:col-span-6"
          >
            {/* Top Brand Tag */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/80 px-3.5 py-1.5 shadow-xs backdrop-blur-sm">
      {/* Subani Segment */}
          <div className="flex items-center gap-1.5">
            <img
              src={subaniLogo}
              alt="Subani Logo"
              className="h-4 w-4 rounded-full object-contain"
            />
            <span
              className="text-xs font-black uppercase tracking-[0.2em]"
              style={{ color: PRIMARY }}
            >
              Subani
            </span>
          </div>

            <span className="text-xs text-gray-300">/</span>

            {/* Koolath Group Segment */}
            <div className="flex items-center gap-1.5">
              <img
                src={koolathLogo}
                alt="Koolath Group Logo"
                className="h-4 w-4 rounded-full object-contain"
              />
              <span className="text-xs font-semibold text-gray-600">
                Koolath Group
              </span>
      </div>
    </div>

            {/* Headline */}
            <h1 className="max-w-xl text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-gray-950">
              Fresh Provisions.
              <span
                className="mt-2 block font-black"
                style={{ color: PRIMARY }}
              >
                Wholesale & Retail
              </span>
              <span className="mt-1 block text-gray-900">Made Simple.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-gray-600">
              Direct sourcing, hygienic processing, and scheduled doorstep
              delivery for households, supermarkets, and commercial businesses
              across Kerala.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
  {/* Products Link */}
  <Link to="/products">
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all shadow-md"
      style={{
        backgroundColor: PRIMARY,
        boxShadow: "0 8px 20px rgba(255,61,87,0.28)",
      }}
    >
      <ShoppingBag className="h-4 w-4" />
      <span>Products</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.div>
  </Link>

  {/* Subani App Button with App Logo */}
  <a
    href={SUBANI_APP_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.div
      whileHover={{ y: -2, borderColor: PRIMARY }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:shadow-sm"
    >
      <img
        src={appLogo}
        alt="Subani App"
        className="h-4 w-4 sm:h-5 sm:w-5 object-contain"
      />
      <span>Subani App</span>
    </motion.div>
  </a>

  {/* Wholesale Button with Wholesale Logo */}
  <a
    href={SUBANI_WHOLESALE_APP_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.div
      whileHover={{ y: -2, borderColor: ACCENT }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:shadow-sm"
    >
      <img
        src={wholesaleLogo}
        alt="Wholesale"
        className="h-4 w-4 sm:h-5 sm:w-5 object-contain"
      />
      <span>Wholesale</span>
    </motion.div>
  </a>
</div>

            {/* Stats Row */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-gray-100 pt-5 sm:max-w-md">
              <div className="rounded-xl border border-gray-100 bg-white/70 p-2.5 shadow-2xs text-left">
                <p className="text-lg sm:text-xl font-black text-gray-900">
                  1,500+
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Products
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white/70 p-2.5 shadow-2xs text-left">
                <p
                  className="text-lg sm:text-xl font-black"
                  style={{ color: PRIMARY }}
                >
                  99.8%
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Fulfillment
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white/70 p-2.5 shadow-2xs text-left">
                <p
                  className="text-lg sm:text-xl font-black"
                  style={{ color: ACCENT_DARK }}
                >
                  100%
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Quality Checked
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT RUNNING IMAGE CARD ================= */}
          <div className="w-full md:col-span-6 lg:col-span-6 flex justify-center">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[540px] rounded-3xl border border-gray-200/80 bg-white p-3 sm:p-4 shadow-xl shadow-gray-200/50 transition-shadow duration-300"
            >
              {/* Image Container with Slider */}
              <div className="relative h-[280px] sm:h-[340px] md:h-[360px] lg:h-[380px] w-full overflow-hidden rounded-2xl bg-gray-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeCompany.id}
                    src={activeCompany.image}
                    alt={activeCompany.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>

                {/* Subtle vignette gradient for text clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Left Badge Overlay */}
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 backdrop-blur-md border border-white/15 shadow-sm">
                  <span
                    className="h-2 w-2 rounded-full animate-pulse"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    {activeCompany.badge}
                  </span>
                </div>

                {/* Bottom Glass Caption Bar */}
                <div className="absolute bottom-3 left-3 right-3 z-10 rounded-xl border border-white/20 bg-black/60 p-3 sm:p-3.5 backdrop-blur-md shadow-lg">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <IconComponent className="h-4 w-4 text-white" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-300 truncate">
                        {activeCompany.tag}
                      </p>
                      <h3 className="text-sm sm:text-base font-extrabold text-white truncate drop-shadow">
                        {activeCompany.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Left / Right Carousel Controls */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition hover:bg-black/70 active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition hover:bg-black/70 active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Interactive Company Selection Pills */}
              <div className="mt-3 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar pt-1">
                {COMPANIES.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition-all ${
                        isActive
                          ? "bg-rose-50 text-rose-700 shadow-2xs border border-rose-200"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                      }`}
                      aria-label={`Select ${item.shortName}`}
                    >
                      <Icon
                        className={`h-3 w-3 shrink-0 ${isActive ? "text-[#FF3D57]" : "text-gray-400 group-hover:text-gray-600"}`}
                      />
                      <span className="hidden sm:inline whitespace-nowrap">
                        {item.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
