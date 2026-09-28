import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Truck, HeadphonesIcon } from "lucide-react";

const PRIMARY = "#C8102E";
const ACCENT = "#F4B400";

const FEATURES = [
  {
    icon: Sparkles,
    title: "100% Fresh & Pure",
    description: "Carefully sourced products maintaining peak flavor, purity, and nutritional value.",
    accent: PRIMARY,
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Standards",
    description: "Multi-stage quality checks with strict hygiene protocols from sourcing to delivery.",
    accent: ACCENT,
  },
  {
    icon: Truck,
    title: "Reliable Distribution",
    description: "Prompt delivery and robust logistics supporting retail and commercial supply chains.",
    accent: PRIMARY,
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Responsive customer assistance for wholesale, bulk queries, and everyday needs.",
    accent: ACCENT,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FeaturesStrip() {
  return (
    <section className="relative z-20 -mt-8 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-6 shadow-md transition-all duration-300 hover:border-red-200 hover:shadow-xl"
              >
                {/* Top Accent Line */}
                <div
                  className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: item.accent }}
                />

                {/* Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${item.accent}15`,
                    color: item.accent === ACCENT ? "#B78100" : item.accent,
                  }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>

                <h3 className="mt-4 text-base font-extrabold text-gray-900 transition-colors group-hover:text-red-700">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
