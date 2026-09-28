import { Link } from "react-router-dom";
import { ArrowUp, MapPin, Phone, Mail } from "lucide-react";
import logo from "../assets/subani.png";

const PRIMARY = "#C8102E";
const ACCENT = "#F4B400";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-gray-800 bg-gray-950 text-white">
      {/* Top Accent Strip */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${PRIMARY} 50%, ${ACCENT} 50%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="SUBANI Logo"
                className="h-12 w-auto max-w-[200px] object-contain object-left"
              />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-gray-400">
              A trusted subsidiary of Iftar Food Industries, dedicated to
              delivering premium grocery provisions, fresh ingredients, and
              exceptional customer service.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="text-xs font-semibold text-gray-300">
                Freshness • Quality • Consistency
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="transition-colors duration-200 hover:text-white flex items-center gap-1.5"
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: PRIMARY }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* IFTAR FOOD INDUSTRIES */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              IFTAR FOOD INDUSTRIES
            </h3>

            <div className="mt-4 space-y-2.5 text-xs leading-relaxed text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                <span>
                  Pump House Road, Perunthallur PO, VP Puram, Tirur, Malappuram
                  (Dist), Kerala - 676102
                </span>
              </p>

              <p className="flex items-center gap-2 pt-1">
                <Phone className="h-4 w-4 shrink-0 text-yellow-400" />
                <span>
                  Phone:{" "}
                  <a
                    href="tel:7510116688"
                    className="font-bold text-white transition hover:text-yellow-400"
                  >
                    +91 75101 16688
                  </a>
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                <a
                  href="mailto:contact@iftarfoodindustries.com"
                  className="transition hover:text-white"
                >
                  contact@iftarfoodindustries.com
                </a>
              </p>
            </div>
          </div>

          {/* SUBANI / KOOLATH SUPERMARKET */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              SUBANI / KOOLATH
            </h3>

            <div className="mt-4 space-y-2.5 text-xs leading-relaxed text-gray-400">
              <p className="font-semibold text-gray-200">KOOLATH SUPERMARKET</p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                <span>
                  Tirur Road, Chamravattom PO, Tirur, Malappuram Dist, Kerala -
                  676102
                </span>
              </p>

              <p className="flex items-center gap-2 pt-1">
                <Phone className="h-4 w-4 shrink-0 text-yellow-400" />
                <span>
                  Phone:{" "}
                  <a
                    href="tel:7510116699"
                    className="font-bold text-white transition hover:text-yellow-400"
                  >
                    +91 75101 16699
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-gray-800 pt-6 gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} SUBANI (Iftar Food Industries). All
            rights reserved. <span className="mx-2 hidden sm:inline">|</span>
            <span className="block sm:inline mt-1 sm:mt-0">
              Designed &amp; Developed by{" "}
              <a
                href="https://winshineinfotech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-300 transition hover:text-white"
              >
                Winshine Infotech
              </a>
            </span>
          </p>

          {/* Smooth Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-xs font-semibold text-gray-300 transition-all duration-200 hover:border-red-500/50 hover:bg-gray-850 hover:text-white hover:scale-105"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" style={{ color: ACCENT }} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
