import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-nav border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center shadow-sm">
              <GraduationCap className={`w-5 h-5 ${scrolled ? 'text-navy-900' : 'text-navy-900'}`} />
            </div>
            <div>
              <span className={`font-bold text-lg font-display leading-tight ${scrolled ? 'text-navy-800' : 'text-white'}`}>
                EPS School
              </span>
              <div className={`text-xs leading-tight ${scrolled ? 'text-gray-500' : 'text-navy-200'}`}>
                Excellence · Perseverance · Service
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2" onMouseLeave={() => setHoveredLink(null)}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-gray-600 hover:text-navy-800'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full ${scrolled ? 'bg-navy-800' : 'bg-gold-400'}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                scrolled ? 'text-navy-800 hover:bg-navy-50' : 'text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </Link>
            <a
              href="#contact"
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 text-sm font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-navy-800' : 'text-white'}`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-navy-800 hover:bg-navy-50 rounded-xl text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex gap-2">
                <Link to="/login" className="flex-1 text-center py-2.5 border-2 border-navy-800 text-navy-800 rounded-xl text-sm font-semibold">Sign In</Link>
                <a href="#contact" className="flex-1 text-center py-2.5 bg-gold-500 text-navy-900 rounded-xl text-sm font-bold">Apply Now</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
