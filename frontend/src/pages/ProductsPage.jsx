import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
} from "lucide-react";
import { PRODUCTS,  } from "../components/Products";
import { getProducts } from "../api/client";

// Corporate Brand Constants
const PRIMARY = "#C8102E"; // Brand Red
const ACCENT = "#F4B400"; // Accent Yellow / Gold
const DARK = "#111827";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -15,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

function ProductCard({ product, onInquire, onView }) {
  return (
    <motion.article
      variants={cardVariants}
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-200/90 bg-white shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-2xl"
    >
      {/* Product Image & Badges */}
      <div>
        <div
          onClick={() => onView(product)}
          className="group/img relative h-64 w-full cursor-pointer overflow-hidden bg-gray-50 flex items-center justify-center p-4 transition-colors hover:bg-gray-100/70"
          title="Click to view image"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = product.fallback || FALLBACK_IMAGE;
            }}
            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Quick Click-to-View Hover Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover/img:opacity-100 flex items-center justify-center">
            <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md backdrop-blur-sm transition-transform group-hover/img:scale-105">
              <Eye className="h-3.5 w-3.5 text-red-600" />
              <span>View Image</span>
            </span>
          </div>

          <span
            className="absolute left-4 top-4 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-xs backdrop-blur-md z-10"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: PRIMARY,
            }}
          >
            {product.category}
          </span>

          {/* Brand Tag */}
          {product.brand && (
            <span
              className="absolute right-4 top-4 rounded-md px-2.5 py-1 text-[9px] font-extrabold tracking-wider uppercase shadow-xs backdrop-blur-xs z-10"
              style={{
                backgroundColor:
                  product.brand === "IFTAR FOOD INDUSTRIES"
                    ? "rgba(200, 16, 46, 0.9)"
                    : product.brand === "KOOLATH SUPERMARKET"
                      ? "rgba(5, 150, 105, 0.92)"
                      : "rgba(0, 0, 0, 0.72)",
                color:
                  product.brand === "IFTAR FOOD INDUSTRIES" ||
                  product.brand === "KOOLATH SUPERMARKET"
                    ? "#FFFFFF"
                    : "#FFCA00",
              }}
            >
              {product.brand}
            </span>
          )}

          {/* Brand Liquid Accent Strip */}
          <motion.div
            className="absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
            style={{
              background: `linear-gradient(90deg, ${PRIMARY} 50%, ${ACCENT} 50%)`,
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col p-6 pb-2">
          <h3
            onClick={() => onView(product)}
            className="cursor-pointer text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 hover:text-red-700 group-hover:text-red-700"
          >
            {product.name}
          </h3>

          <p className="mt-2.5 flex-1 text-sm leading-6 text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Feature Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.specs.map((spec) => (
              <motion.span
                key={spec}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50/90 px-2.5 py-1 text-[11px] font-semibold text-gray-700 transition-colors group-hover:border-red-100 group-hover:bg-red-50/50"
              >
                <Check
                  className="h-3 w-3"
                  strokeWidth={3}
                  style={{ color: PRIMARY }}
                />
                {spec}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & WhatsApp Inquiry */}
      <div className="border-t border-gray-100 p-6 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Pricing
            </span>
            <span className="mt-0.5 block text-xs font-bold text-gray-900 sm:text-sm">
              {product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onView(product)}
              className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 shadow-2xs transition-all duration-200 hover:border-red-200 hover:bg-gray-50 active:scale-95"
              title="View image"
            >
              <Eye className="h-3.5 w-3.5 text-gray-500" />
              <span className="hidden sm:inline">View</span>
            </button>

            <motion.button
              type="button"
              onClick={() => onInquire(product)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group/btn relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:shadow-lg"
              style={{ backgroundColor: PRIMARY }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Inquire</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navContainerRef = useRef(null);

  // Fetch live products from MongoDB backend on mount
  useEffect(() => {
    let isMounted = true;
    getProducts()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((item) => ({
            ...item,
            id: item._id || item.id,
            image:
              item.image?.startsWith("http") ||
              item.image?.startsWith("/images/")
                ? item.image
                : (localImageMap &&
                    localImageMap.get(item.name.toLowerCase())) ||
                  item.image ||
                  item.fallback ||
                  FALLBACK_IMAGE,
          }));
          setProducts(mapped);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const DIVISIONS = [
    { id: "All", label: "All Products", count: products.length },
    {
      id: "KOOLATH SUPERMARKET",
      label: "Koolath Supermarket",
      count: products.filter((p) => p.brand === "KOOLATH SUPERMARKET").length,
    },
    {
      id: "KOOLATH MILLING COMPANY",
      label: "Koolath Milling Co.",
      count: products.filter((p) => p.brand === "KOOLATH MILLING COMPANY")
        .length,
    },
    {
      id: "IFTAR FOOD INDUSTRIES",
      label: "Iftar Food Industries",
      count: products.filter((p) => p.brand === "IFTAR FOOD INDUSTRIES").length,
    },
  ];

  const divisionProducts =
    selectedDivision === "All"
      ? products
      : products.filter((product) => product.brand === selectedDivision);

  const categories = [
    "All",
    ...Array.from(new Set(divisionProducts.map((product) => product.category))),
  ];

  const checkScrollability = () => {
    if (navContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollability();
    const handleResize = () => checkScrollability();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(checkScrollability, 150);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [categories.length, selectedDivision]);

  const handleCategoryScroll = (direction) => {
    if (navContainerRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220;
      navContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 300);
    }
  };

  const selectCategory = (category, btnElement) => {
    setSelectedCategory(category);
    if (navContainerRef.current && btnElement) {
      const container = navContainerRef.current;
      const scrollLeft =
        btnElement.offsetLeft -
        container.offsetLeft -
        container.clientWidth / 2 +
        btnElement.clientWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 300);
    }
  };

  const filteredProducts = divisionProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      (product.brand && product.brand.toLowerCase().includes(q)) ||
      (product.category && product.category.toLowerCase().includes(q)) ||
      (product.description && product.description.toLowerCase().includes(q)) ||
      (product.specs && product.specs.some((s) => s.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeProduct]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeProduct) return;
      if (e.key === "Escape") {
        setActiveProduct(null);
      } else if (e.key === "ArrowLeft") {
        const curr = filteredProducts.findIndex(
          (p) => p.id === activeProduct.id,
        );
        if (curr > 0) setActiveProduct(filteredProducts[curr - 1]);
        else setActiveProduct(filteredProducts[filteredProducts.length - 1]);
      } else if (e.key === "ArrowRight") {
        const curr = filteredProducts.findIndex(
          (p) => p.id === activeProduct.id,
        );
        if (curr < filteredProducts.length - 1)
          setActiveProduct(filteredProducts[curr + 1]);
        else setActiveProduct(filteredProducts[0]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProduct, filteredProducts]);

  const currentIndex = activeProduct
    ? filteredProducts.findIndex((p) => p.id === activeProduct.id)
    : -1;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setActiveProduct(filteredProducts[currentIndex - 1]);
    } else {
      setActiveProduct(filteredProducts[filteredProducts.length - 1]);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < filteredProducts.length - 1) {
      setActiveProduct(filteredProducts[currentIndex + 1]);
    } else {
      setActiveProduct(filteredProducts[0]);
    }
  };

  const handleInquire = (product) => {
    const isIftar =
      product.brand === "IFTAR FOOD INDUSTRIES" ||
      product.brand?.toLowerCase().includes("iftar");
    const targetNumber =
      product.whatsapp || (isIftar ? "917510116688" : "917510116699");
    const brandName = isIftar
      ? "Iftar Food Industries"
      : product.brand || "Koolath Milling Company";
    const message = encodeURIComponent(
      `Hello ${brandName}, I am interested in "${product.name}". Please share product specifications, bulk pricing, and minimum order quantity.`,
    );
    window.open(`https://wa.me/${targetNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2"
            >
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: PRIMARY }}
              >
                {selectedDivision === "All"
                  ? "KOOLATH GROUP ENTERPRISES"
                  : selectedDivision}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
            >
              Explore Our <span style={{ color: PRIMARY }}>Products</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 max-w-2xl text-base leading-7 text-gray-600"
            >
              Discover quality food products, milled provisions, and supermarket
              essentials crafted with high hygiene standards and dependable
              freshness.
            </motion.p>
          </div>

          {/* Quick Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative w-full max-w-xs"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, specs..."
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-gray-900 shadow-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </motion.div>
        </div>

        {/* Division / Brand Switcher Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {DIVISIONS.map((div) => {
            const isActive = selectedDivision === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => {
                  setSelectedDivision(div.id);
                  setSelectedCategory("All");
                }}
                className={`relative rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gray-950 text-white shadow-md scale-105"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span>{div.label}</span>
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {div.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Tabs with Single-Line Horizontal Scroll and Arrow Buttons */}
        <div className="relative mt-6 flex w-full items-center justify-start">
          <motion.button
            type="button"
            onClick={() => handleCategoryScroll("left")}
            disabled={!canScrollLeft}
            whileHover={{ scale: canScrollLeft ? 1.1 : 1 }}
            whileTap={{ scale: canScrollLeft ? 0.92 : 1 }}
            className={`mr-1.5 sm:mr-2 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 ${
              !canScrollLeft
                ? "cursor-not-allowed opacity-25 pointer-events-none"
                : "hover:border-red-200 hover:text-red-600 hover:shadow-md cursor-pointer active:bg-gray-50"
            }`}
            aria-label="Scroll Categories Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>

          <div
            ref={navContainerRef}
            onScroll={checkScrollability}
            className="flex items-center gap-2 overflow-x-auto px-1 py-2 no-scrollbar scroll-smooth"
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={(e) => selectCategory(category, e.currentTarget)}
                  className="relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 focus:outline-none"
                  style={{
                    color: isActive ? "#FFFFFF" : DARK,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProductsPill"
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

                  <span className="relative z-10 flex items-center gap-2">
                    {category}
                    {isActive && (
                      <motion.span
                        layoutId="activeProdTabDot"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ duration: 0.3 }}
                        className="inline-block h-2 w-2 rounded-full ring-2 ring-white/30"
                        style={{ backgroundColor: ACCENT }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.button
            type="button"
            onClick={() => handleCategoryScroll("right")}
            disabled={!canScrollRight}
            whileHover={{ scale: canScrollRight ? 1.1 : 1 }}
            whileTap={{ scale: canScrollRight ? 0.92 : 1 }}
            className={`ml-1.5 sm:ml-2 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 ${
              !canScrollRight
                ? "cursor-not-allowed opacity-25 pointer-events-none"
                : "hover:border-red-200 hover:text-red-600 hover:shadow-md cursor-pointer active:bg-gray-50"
            }`}
            aria-label="Scroll Categories Right"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Product Grid */}
        <motion.div
          key={selectedDivision + selectedCategory + searchQuery}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onInquire={handleInquire}
                  onView={setActiveProduct}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center text-gray-500"
              >
                No products found matching &ldquo;{searchQuery}&rdquo;.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ============================================================
            PRODUCT IMAGE LIGHTBOX / DETAIL MODAL
        ============================================================ */}
        <AnimatePresence>
          {activeProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProduct(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveProduct(null)}
                  className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-md"
                  aria-label="Close product view"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Left & Right Carousel Arrows inside modal */}
                {filteredProducts.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-gray-800 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:scale-110 active:scale-95"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-gray-800 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:scale-110 active:scale-95"
                      aria-label="Next product"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Large Product Image Preview */}
                <div className="relative flex h-72 sm:h-96 w-full items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100/60 p-6 sm:p-8">
                  <motion.img
                    key={activeProduct.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.2 }}
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        activeProduct.fallback || FALLBACK_IMAGE;
                    }}
                    className="h-full w-full object-contain drop-shadow-md"
                  />

                  {/* Top Left Category Badge */}
                  <span
                    className="absolute left-4 top-4 rounded-lg px-3 py-1.5 text-xs font-bold shadow-xs backdrop-blur-md"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      color: PRIMARY,
                    }}
                  >
                    {activeProduct.category}
                  </span>
                </div>

                {/* Product Details Section */}
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span
                        className="inline-block rounded-md px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider"
                        style={{
                          backgroundColor:
                            activeProduct.brand === "IFTAR FOOD INDUSTRIES"
                              ? "rgba(200, 16, 46, 0.12)"
                              : activeProduct.brand === "KOOLATH SUPERMARKET"
                                ? "rgba(5, 150, 105, 0.15)"
                                : "rgba(244, 180, 0, 0.18)",
                          color:
                            activeProduct.brand === "IFTAR FOOD INDUSTRIES"
                              ? "#C8102E"
                              : activeProduct.brand === "KOOLATH SUPERMARKET"
                                ? "#059669"
                                : "#854d0e",
                        }}
                      >
                        {activeProduct.brand}
                      </span>
                      <h3 className="mt-1 text-xl sm:text-2xl font-black text-gray-900">
                        {activeProduct.name}
                      </h3>
                    </div>

                    <span className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-black text-gray-900">
                      {activeProduct.price}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-600">
                    {activeProduct.description}
                  </p>

                  {/* Quality Specifications */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeProduct.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-50/80 px-2.5 py-1 text-xs font-semibold text-red-700"
                      >
                        <Check className="h-3.5 w-3.5 text-red-600" />
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Modal Footer */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <span className="text-[11px] text-gray-400 text-center sm:text-left">
                      Product #{currentIndex + 1} of {filteredProducts.length} •
                      Press Esc to close
                    </span>

                    <a
                      href={`https://wa.me/${
                        activeProduct.whatsapp ||
                        (activeProduct.brand === "IFTAR FOOD INDUSTRIES"
                          ? "917510116688"
                          : "917510116699")
                      }?text=${encodeURIComponent(
                        `Hello ${activeProduct.brand}, I would like to inquire about "${activeProduct.name}". Please share product specifications and bulk pricing.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:shadow-md hover:scale-105 active:scale-95"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>
                        Inquire on WhatsApp (+91{" "}
                        {activeProduct.brand === "IFTAR FOOD INDUSTRIES"
                          ? "75101 16688"
                          : "75101 16699"}
                        )
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
