import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Info,
  ShoppingBag,
  Image as GalleryIcon,
  Phone,
  Menu,
  X,
} from "lucide-react";

import logo from "../assets/image.png";

// Corporate Brand Colors
const PRIMARY = "#C8102E"; // Corporate Red
const ACCENT = "#F4B400";  // Corporate Yellow / Gold
const DARK = "#111827";    // Charcoal
const MUTED = "#6B7280";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Products", href: "/products", icon: ShoppingBag },
  { label: "Gallery", href: "/gallery", icon: GalleryIcon },
  { label: "Contact", href: "/contact", icon: Phone },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white shadow-xs"
      }`}
    >
      <div className="relative mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo - Left */}
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="group flex shrink-0 items-center"
        >
          <img
            src={logo}
            alt="IFTAR FOOD INDUSTRIES Logo"
            className="block h-11 w-auto max-w-[165px] object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </NavLink>

        {/* Desktop Navigation - Exact Center */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-gray-200 bg-gray-50/90 p-1.5 backdrop-blur-sm md:flex">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.href}
                to={link.href}
                className="group relative flex items-center gap-2 rounded-full border border-transparent px-4 py-2.5 text-sm transition-all duration-300 hover:border-[#C8102E] hover:bg-[#FFF5F6]"
              >
                {({ isActive }) => (
                  <>
                    {/* Active Tab Pill Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 rounded-full bg-white shadow-sm"
                        style={{
                          border: `1px solid ${PRIMARY}`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.95,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="relative z-10 transition-colors duration-300 group-hover:text-[#C8102E]"
                      style={{
                        color: isActive ? PRIMARY : MUTED,
                      }}
                    >
                      <Icon
                        size={17}
                        strokeWidth={isActive ? 2.4 : 1.9}
                      />
                    </motion.div>

                    {/* Label */}
                    <span
                      className="relative z-10 whitespace-nowrap transition-colors duration-300 group-hover:text-[#C8102E]"
                      style={{
                        color: isActive ? PRIMARY : DARK,
                        fontWeight: isActive ? 600 : 500,
                      }}
                    >
                      {link.label}
                    </span>

                    {/* Active Accent Dot */}
                    <motion.span
                      layoutId={isActive ? "activeNavIndicator" : undefined}
                      className="relative z-10 h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: ACCENT,
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    {/* Hover Gold Line */}
                    <span
                      className="absolute bottom-0.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-8"
                      style={{
                        backgroundColor: ACCENT,
                      }}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 transition-all duration-200 hover:border-[#C8102E] hover:bg-[#FFF5F6] md:hidden"
          style={{
            color: PRIMARY,
          }}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={23} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu size={23} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden"
          >
            <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-1.5">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;

                  return (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group rounded-xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-[#C8102E] hover:bg-[#FFF5F6]"
                    >
                      {({ isActive }) => (
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all"
                            style={{
                              backgroundColor: isActive
                                ? PRIMARY
                                : `${PRIMARY}0D`,
                              color: isActive ? "#FFFFFF" : PRIMARY,
                            }}
                          >
                            <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
                          </div>

                          <span
                            className="text-sm transition-colors duration-200 group-hover:text-[#C8102E]"
                            style={{
                              color: isActive ? PRIMARY : DARK,
                              fontWeight: isActive ? 600 : 500,
                            }}
                          >
                            {link.label}
                          </span>

                          {isActive && (
                            <span
                              className="ml-auto h-2 w-2 rounded-full"
                              style={{
                                backgroundColor: ACCENT,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navigation;
