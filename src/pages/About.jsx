import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Award,
  Factory,
  Building2,
  Store,
  Compass,
  Mail,
  ExternalLink,
  Camera,
} from "lucide-react";
import brandLogo from "../assets/subani.png";
import koolathMillingImg from "../assets/image.png";

// Company Brand Assets
import millingLogo from "../assets/logo/milling.png";
import enterLogo from "../assets/logo/enter.png";
import iftarLogo from "../assets/logo/iftar.png";
import marketLogo from "../assets/logo/market.png";
import arLogo from "../assets/logo/ar.png";

// Corporate Brand Constants
const PRIMARY = "#ff3d57";
const YELLOW = "#ffca00";
const DARK = "#ff1130";

const SPLIT_GRADIENT = `linear-gradient(
  90deg,
  ${PRIMARY} 0%,
  ${PRIMARY} 50%,
  ${YELLOW} 50%,
  ${YELLOW} 100%
)`;

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

/* ============================================================
   CORE COMMITMENTS
============================================================ */
const PILLARS = [
  {
    icon: Sparkles,
    title: "Uncompromising Freshness",
    desc: "From farm to retail shelf, every batch is selected to maintain peak freshness and flavor.",
  },
  {
    icon: ShieldCheck,
    title: "Rigorous Hygiene",
    desc: "Strict adherence to safety standards and hygienic handling at every stage of storage.",
  },
  {
    icon: Award,
    title: "Trusted Benchmark",
    desc: "Backed by the manufacturing standards and credibility of Iftar Food Industries.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    desc: "Dedicated to building long-term relationships with local households and bulk buyers alike.",
  },
];

/* ============================================================
   KOOLATH GROUP VENTURES
============================================================ */
const KOOLATH_VENTURES = [
  {
    name: "Koolath Milling Company",
    subtitle: "Grain Processing & Automated Milling",
    address: "Pump House Road, Perunthallur",
    phones: ["+91 92079 87987", "+91 92079 86986"],
    mapQuery:
      "Koolath Milling Company, Pump House Road, Perunthallur, Tirur, Kerala",
    icon: Factory,
    accent: "#C8102E",
    image: koolathMillingImg,
    image: millingLogo,
  },
  {
    name: "Koolath Enterprises",
    subtitle: "Commercial Trading & Bulk Distribution",
    address: "Pump House Road, Perunthallur",
    phones: ["+91 96057 77799"],
    mapQuery:
      "Koolath Enterprises, Pump House Road, Perunthallur, Tirur, Kerala",
    icon: Building2,
    accent: "#0284C7",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    image: enterLogo,
  },
  {
    name: "Iftar Food Industries",
    subtitle: "Importer & Distributor",
    address: "Pump House Road, Perunthallur",
    phones: ["+91 75101 16688"],
    mapQuery:
      "Iftar Food Industries, Pump House Road, Perunthallur, Tirur, Kerala",
    icon: Award,
    accent: "#059669",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80",
    image: iftarLogo,
  },
  {
    name: "Subani Koolath Supermarket",
    subtitle: "Retail Mart & Daily Provisions",
    address: "Tirur Road, Chamravattom",
    phones: ["+91 75101 16699"],
    mapQuery: "Subani Koolath Supermarket, Tirur Road, Chamravattom, Kerala",
    icon: Store,
    accent: "#EA580C",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80",
    image: marketLogo,
  },
  {
    name: "Archend Builders & Events",
    subtitle: "Architectural Construction & Luxury Events",
    address: "Opp. GUP School, Chamravattom",
    phones: ["+91 95393 03954"],
    mapQuery: "GUP School Chamravattom, Kerala",
    icon: Compass,
    accent: "#7C3AED",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
    image: arLogo,
  },
];

export default function About() {
  return (
    <section className="min-h-screen bg-gray-50/50 px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HERO / INTRODUCTION
        ================================================= */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-50px",
            }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2">
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: PRIMARY }}
              >
                We Are
              </span>

              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: YELLOW }}
              />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-2 text-5xl font-black tracking-tight sm:text-6xl"
              style={{ color: PRIMARY }}
            >
              Subani!
            </motion.h1>

            <motion.h2
              variants={fadeInUp}
              className="mt-6 text-xl font-bold leading-8 text-gray-900 sm:text-2xl"
            >
              &ldquo;Elevate Your Shopping Experience with{" "}
              <span style={{ color: PRIMARY }}>Subani</span>&rdquo;
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base leading-8 text-gray-600"
            >
              Welcome to <strong>Subani</strong>, your one-stop destination for
              all your grocery and food provisions. At Subani, we pride
              ourselves on offering a wide range of high-quality products that
              cater to every customer&apos;s preferences and dietary
              requirements.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-base leading-8 text-gray-600"
            >
              Whether you&apos;re looking for fresh ingredients, pantry
              essentials, or specialty items, our facilities are stocked with an
              extensive selection to meet your demands. Backed by Iftar Food
              Industries and Koolath Group, Subani upholds a steadfast
              commitment to unmatched quality and service.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 h-1.5 w-28 rounded-full"
              style={{ background: SPLIT_GRADIENT }}
            />
          </motion.div>

          {/* Visual Showcase */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative"
          >
            <div
              className="absolute -inset-2 rounded-3xl opacity-30 blur-2xl"
              style={{
                background: `linear-gradient(
                  135deg,
                  ${PRIMARY},
                  ${YELLOW}
                )`,
              }}
            />

            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-3 shadow-2xl">
              <div className="relative h-96 w-full overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
                  alt="Subani Fresh Market"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Floating Badge */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/30 bg-black/60 p-4 text-white backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: PRIMARY,
                      }}
                    >
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-400">
                        Heritage & Freshness
                      </p>

                      <p className="text-sm font-extrabold text-white">
                        Everyday Quality You Trust
                      </p>
                    </div>
                  </div>

                  <span
                    className="rounded-full px-3 py-1 text-xs font-black"
                    style={{
                      backgroundColor: YELLOW,
                      color: DARK,
                    }}
                  >
                    100% Pure
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =================================================
            CORE VALUES
        ================================================= */}
        <div className="mt-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto max-w-2xl text-center"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: PRIMARY }}
            >
              Our Core Commitments
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Customers Rely on{" "}
              <span style={{ color: PRIMARY }}>Subani</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;

              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-xl"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${PRIMARY}12`,
                      color: PRIMARY,
                    }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-gray-900">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* =================================================
            CORPORATE HEADQUARTERS
        ================================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="mt-24 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-md sm:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: PRIMARY }}
              >
                Corporate Headquarters
              </span>

              <h3 className="mt-1 text-2xl font-black text-gray-900 sm:text-3xl">
                KOOLATH GROUP OF COMPANIES
              </h3>

              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <MapPin className="h-4 w-4" style={{ color: PRIMARY }} />
                Chamravattom, Malappuram, Kerala
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:9605777799"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-black sm:text-sm"
              >
                <Phone className="h-3.5 w-3.5 text-yellow-400" />
                +91 96057 77799
              </a>

              <a
                href="mailto:koolathgroup@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-50 sm:text-sm"
              >
                <Mail className="h-3.5 w-3.5" style={{ color: PRIMARY }} />
                koolathgroup@gmail.com
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Chamravattom+Malappuram+Kerala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow transition sm:text-sm"
                style={{
                  backgroundColor: PRIMARY,
                }}
              >
                <MapPin className="h-3.5 w-3.5" />
                Locate HQ
                <ExternalLink className="ml-0.5 h-3 w-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            GROUP ENTERPRISES (WITH VENTURE IMAGES)
            GROUP ENTERPRISES (WITH VENTURE LOGOS)
        ================================================= */}
        <div className="mt-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto max-w-2xl text-center"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{
                color: PRIMARY,
              }}
            >
              Group Enterprises
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Sister Companies & Divisions
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              Direct access and navigation to each sister firm under the Koolath
              banner.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {KOOLATH_VENTURES.map((item, index) => {
              const VentureIcon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#C8102E] hover:shadow-2xl"
                >
                  {/* Top Image Banner - Brand Logo Presentation */}
                  <div className="relative flex h-52 w-full items-center justify-center overflow-hidden border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white p-6">
                    <img
                      src={item.image}
                      alt={`${item.name} Logo`}
                      className="max-h-full max-w-[80%] object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-20" />

                    {/* Badge */}
                    <div className="absolute top-3 right-3 rounded-full border border-gray-200 bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-md">
                      Venture #{index + 1}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:bg-[#C8102E] group-hover:text-white"
                          style={{
                            backgroundColor: `${item.accent}15`,
                            color: item.accent,
                          }}
                        >
                          <VentureIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        <div>
                          <h3 className="text-base font-black text-gray-900 transition-colors duration-300 group-hover:text-[#C8102E]">
                            {item.name}
                          </h3>
                          <p
                            className="text-xs font-semibold"
                            style={{
                              color: item.accent,
                            }}
                          >
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="mt-4 flex items-start gap-2 text-xs text-gray-600">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{
                            color: PRIMARY,
                          }}
                        />
                        <span>{item.address}</span>
                      </div>

                      {/* Phone Numbers */}
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-gray-800">
                        {item.phones.map((phone, pIdx) => (
                          <a
                            key={pIdx}
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 transition-all duration-300 hover:border-[#C8102E] hover:bg-white"
                          >
                            <Phone className="h-3 w-3 text-gray-500 transition-colors group-hover:text-[#C8102E]" />
                            <span>{phone}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Google Location Link */}
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          item.mapQuery,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-2.5 text-xs font-bold text-gray-800 transition-all duration-300 hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white"
                      >
                        <MapPin className="h-3.5 w-3.5 text-red-500 transition-colors group-hover:text-white" />
                        <span>View Google Location</span>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* =================================================
            BRAND HIGHLIGHT
        ================================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-50px",
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.1,
          }}
          whileHover={{
            y: -4,
          }}
          className="mt-20 flex flex-col items-center justify-center rounded-3xl border border-gray-200/80 bg-white px-8 py-14 text-center shadow-lg transition-all hover:shadow-2xl"
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{
              color: PRIMARY,
            }}
          >
            About Subani
          </span>

          <motion.img
            src={brandLogo}
            alt="Subani Logo"
            className="mt-6 h-16 w-auto object-contain"
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
          />

          <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600">
            At Subani, we pride ourselves on offering a wide selection of
            premium items catering to modern culinary needs. From everyday
            essentials to handpicked delicacies, we guarantee uncompromised
            freshness and honest pricing across our network.
          </p>
        </motion.div>

        {/* =================================================
            CALL TO ACTION
        ================================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-50px",
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="mt-20 text-center"
        >
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{
              color: PRIMARY,
            }}
          >
            Find Us
          </h2>

          <p className="mt-3 text-base text-gray-600">
            Visit Subani today and experience quality, convenience, and absolute
            freshness.
          </p>

          <motion.a
            href="tel:7510116699"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-xl"
            style={{
              backgroundColor: PRIMARY,
              boxShadow: "0 8px 20px -4px rgba(200, 16, 46, 0.45)",
            }}
          >
            <Phone
              className="h-4 w-4"
              style={{
                color: YELLOW,
              }}
            />

            <span>Call Subani: +91 75101 16699</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
