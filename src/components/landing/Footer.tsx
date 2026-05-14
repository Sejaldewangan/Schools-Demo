
import { GraduationCap, Mail, Phone, MapPin, Globe, MessageCircle, Send, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-navy-100 pt-20 pb-10 border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-navy-900" />
              </div>
              <span className="font-bold text-xl text-white font-display">EPS School</span>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed pr-4">
              A premier educational institution committed to fostering excellence, innovation, and holistic development in every student.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, Send, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Academics', 'Admissions', 'Campus Life', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display">Portals</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                  Parent Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                  Faculty Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                  Alumni Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-navy-300">
                  123 Education Boulevard,<br />
                  Knowledge City, ED 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-sm text-navy-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-sm text-navy-300">info@eps.school</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">
            © {new Date().getFullYear()} EPS School. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-navy-400">
            <a href="#" className="hover:text-gold-400">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
