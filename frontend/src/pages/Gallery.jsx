import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getGalleryItems } from "../api/client";

// Local Company Assets
import millingLogo from "../assets/logo/milling.png";
import enterLogo from "../assets/logo/enter.png";
import iftarLogo from "../assets/logo/iftar.png";
import marketLogo from "../assets/logo/market.png";
import arLogo from "../assets/logo/ar.png";

const LOGO_MAP = {
  "milling.png": millingLogo,
  "enter.png": enterLogo,
  "iftar.png": iftarLogo,
  "market.png": marketLogo,
  "ar.png": arLogo,
};

function resolveGalleryImage(imgPath) {
  if (!imgPath) return FALLBACK_IMAGE;
  if (
    imgPath.startsWith("http://") ||
    imgPath.startsWith("https://") ||
    imgPath.startsWith("data:")
  ) {
    return imgPath;
  }
  const filename = imgPath.split("/").pop();
  if (filename && LOGO_MAP[filename]) {
    return LOGO_MAP[filename];
  }
  return imgPath;
}

// Corporate Brand Constants & Split Accents
const PRIMARY = "#C8102E"; // Brand Red
const YELLOW = "#F4B400"; // Brand Yellow
const DARK = "#111827";

const SPLIT_GRADIENT = `linear-gradient(90deg, ${PRIMARY} 0%, ${PRIMARY} 50%, ${YELLOW} 50%, ${YELLOW} 100%)`;

// Venture Tabs Configuration
export const VENTURE_TABS = [
  "All",
  "KOOLATH GROUP OF COMPANIES",
  "SUBANI KOOLATH SUPERMARKET",
  "IFTAR FOOD INDUSTRIES",
  "ARCHEND BUILDERS",
  "KOOLATH ENTERPRISES",
];

const GALLERY_ITEMS = [
  // KOOLATH GROUP OF COMPANIES / MILLING
  {
    id: 1,
    title: "Milling Line & Storage Hub",
    category: "KOOLATH GROUP OF COMPANIES",
    tagline: "KOOLATH MILLING CO.",
    image: millingLogo,
    isLogo: true,
  },

  // SUBANI KOOLATH SUPERMARKET
  {
    id: 3,
    title: "Subani Supermarket Brand Identity",
    category: "SUBANI KOOLATH SUPERMARKET",
    tagline: "RETAIL & DAILY PROVISIONS",
    image: marketLogo,
    isLogo: true,
  },

  // IFTAR FOOD INDUSTRIES
  {
    id: 6,
    title: "Iftar Food Brand Emblem",
    category: "IFTAR FOOD INDUSTRIES",
    tagline: "IMPORTER & DISTRIBUTOR",
    image: iftarLogo,
    isLogo: true,
  },

  // ARCHEND BUILDERS
  {
    id: 9,
    title: "Archend Architecture & Builds",
    category: "ARCHEND BUILDERS",
    tagline: "BUILDERS & LUXURY EVENTS",
    image: arLogo,
    isLogo: true,
  },

  // KOOLATH ENTERPRISES
  {
    id: 11,
    title: "Koolath Enterprises Trading",
    category: "KOOLATH ENTERPRISES",
    tagline: "COMMERCIAL TRADING",
    image: enterLogo,
    isLogo: true,
  },
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

function GalleryCard({ item, onSelect }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      style={{ perspective: 1000 }}
      className="h-80 w-full"
    >
      <motion.article
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(item)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-red-300 hover:shadow-2xl"
      >
        {/* Background Image or Logo Presentation */}
        <div
          className={`relative h-full w-full overflow-hidden ${
            item.isLogo
              ? "flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-8"
              : "bg-gray-900"
          }`}
        >
          <motion.img
            src={item.image}
            alt={item.title}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            loading="lazy"
            className={`${
              item.isLogo
                ? "max-h-40 max-w-[75%] object-contain drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-110"
                : "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            }`}
          />
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-95"
          style={{
            background: item.isLogo
              ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* Accent Bar */}
        <div
          className="absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
          style={{ background: SPLIT_GRADIENT }}
        />

        {/* Card Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: PRIMARY,
              }}
            >
              <Sparkles className="h-2.5 w-2.5" style={{ color: YELLOW }} />
              {item.category}
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="transform transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                {item.tagline}
              </span>
              <h3 className="mt-1 text-xl font-black tracking-tight text-white transition-colors group-hover:text-yellow-400 sm:text-2xl">
                {item.title}
              </h3>
            </div>

            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-xl transition-all duration-300 group-hover:scale-110">
              <div
                className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                style={{ background: SPLIT_GRADIENT }}
              />
              <ArrowUpRight className="relative z-10 h-4 w-4 text-gray-900 transition-colors duration-300 group-hover:text-white" />
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState(GALLERY_ITEMS);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItem, setActiveItem] = useState(null);

  const navContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fetch live gallery items from MongoDB backend on mount
  useEffect(() => {
    let isMounted = true;
    getGalleryItems()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((item) => ({
            ...item,
            id: item._id || item.id,
            image: resolveGalleryImage(item.image),
          }));
          setGalleryItems(mapped);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const activeIndex = activeItem
    ? filteredItems.findIndex((item) => item.id === activeItem.id)
    : -1;

  const handleNext = useCallback(() => {
    if (activeIndex >= 0 && filteredItems.length > 0) {
      const nextIndex = (activeIndex + 1) % filteredItems.length;
      setActiveItem(filteredItems[nextIndex]);
    }
  }, [activeIndex, filteredItems]);

  const handlePrev = useCallback(() => {
    if (activeIndex >= 0 && filteredItems.length > 0) {
      const prevIndex =
        (activeIndex - 1 + filteredItems.length) % filteredItems.length;
      setActiveItem(filteredItems[prevIndex]);
    }
  }, [activeIndex, filteredItems]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeItem) return;
      if (e.key === "Escape") {
        setActiveItem(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, handleNext, handlePrev]);

  const checkScrollability = () => {
    if (navContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

  const handleScroll = (direction) => {
    if (navContainerRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      navContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
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
              KOOLATH GROUP VENTURES
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: YELLOW }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            Group Portfolio & <span style={{ color: PRIMARY }}>Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7"
          >
            Explore our supermarket aisles, automated grain milling
            infrastructure, commercial trade distribution, and architectural
            divisions.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 h-1 w-20 rounded-full"
            style={{ background: SPLIT_GRADIENT }}
          />
        </div>

        {/* Venture Navigation Tabs With Scroll Arrows */}
        <div className="relative mx-auto mt-8 flex max-w-5xl items-center justify-center sm:mt-10">
          <motion.button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            whileHover={{ scale: canScrollLeft ? 1.1 : 1 }}
            whileTap={{ scale: canScrollLeft ? 0.9 : 1 }}
            className={`mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 ${
              !canScrollLeft
                ? "cursor-not-allowed opacity-30"
                : "hover:border-red-200 hover:text-red-600 hover:shadow-md"
            }`}
            aria-label="Scroll Tabs Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>

          <div
            ref={navContainerRef}
            onScroll={checkScrollability}
            className="flex items-center gap-2 overflow-x-auto px-2 py-2 no-scrollbar sm:gap-2.5"
          >
            {VENTURE_TABS.map((tab) => {
              const isActive = selectedCategory === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedCategory(tab)}
                  className="relative shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 focus:outline-none sm:px-5 sm:py-2.5"
                  style={{
                    color: isActive ? "#FFFFFF" : DARK,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryPill"
                      className="absolute inset-0 rounded-full shadow-lg"
                      style={{
                        backgroundColor: PRIMARY,
                        boxShadow: `0 8px 20px -4px rgba(200, 16, 46, 0.45)`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  {!isActive && (
                    <div className="absolute inset-0 rounded-full border border-gray-200 bg-white transition-colors duration-200 hover:border-red-200 hover:bg-gray-50" />
                  )}

                  <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                    {tab}
                    {isActive && (
                      <motion.span
                        layoutId="activeGalleryDot"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ duration: 0.3 }}
                        className="inline-block h-2 w-2 rounded-full ring-2 ring-white/40 sm:h-2.5 sm:w-2.5"
                        style={{ background: SPLIT_GRADIENT }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            whileHover={{ scale: canScrollRight ? 1.1 : 1 }}
            whileTap={{ scale: canScrollRight ? 0.9 : 1 }}
            className={`ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 ${
              !canScrollRight
                ? "cursor-not-allowed opacity-30"
                : "hover:border-red-200 hover:text-red-600 hover:shadow-md"
            }`}
            aria-label="Scroll Tabs Right"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Gallery Grid */}
        <motion.div
          key={selectedCategory}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <GalleryCard key={item.id} item={item} onSelect={setActiveItem} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Navigation Arrows */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black"
                      aria-label="Previous item"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black"
                      aria-label="Next item"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Modal View */}
                <div
                  className={`relative flex max-h-[60vh] w-full items-center justify-center sm:max-h-[65vh] ${
                    activeItem.isLogo ? "bg-gray-100 p-8" : "bg-black"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeItem.id}
                      src={activeItem.image}
                      alt={activeItem.title}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className={`max-h-[60vh] sm:max-h-[65vh] ${
                        activeItem.isLogo
                          ? "max-w-[80%] object-contain"
                          : "w-full object-contain"
                      }`}
                    />
                  </AnimatePresence>
                </div>

                {/* Modal Content Details */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm"
                      style={{
                        backgroundColor: PRIMARY,
                        color: "#FFFFFF",
                      }}
                    >
                      {activeItem.category}
                    </span>

                    {activeIndex >= 0 && (
                      <span className="text-xs font-semibold text-gray-400">
                        {activeIndex + 1} / {filteredItems.length}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-xl font-black text-gray-900 sm:text-2xl md:text-3xl">
                    {activeItem.title}
                  </h3>

                  <div
                    className="mt-4 h-1 w-20 rounded-full"
                    style={{ background: SPLIT_GRADIENT }}
                  />
                </div>

                <div
                  className="absolute bottom-0 left-0 h-1.5 w-full"
                  style={{ background: SPLIT_GRADIENT }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
