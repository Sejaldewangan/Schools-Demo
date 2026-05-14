import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, Award, Users } from 'lucide-react';

const SLIDES = [
  {
    title: 'Shaping Tomorrow\'s',
    highlight: 'Leaders Today',
    subtitle: 'A premier institution dedicated to academic excellence, character development, and holistic growth for every student.',
    cta: 'Admissions Open 2024–25',
    bg: 'from-[#0d1757] via-[#1a237e] to-[#283593]',
    stat: { value: '98%', label: 'Board Pass Rate' },
  },
  {
    title: 'World-Class Education',
    highlight: 'Infinite Possibilities',
    subtitle: 'State-of-the-art facilities, experienced faculty, and a curriculum designed to prepare students for global success.',
    cta: 'Explore Programs',
    bg: 'from-[#1a237e] via-[#283593] to-[#311b92]',
    stat: { value: '25+', label: 'Years of Excellence' },
  },
  {
    title: 'Nurturing Talent,',
    highlight: 'Building Character',
    subtitle: 'Beyond academics, we develop well-rounded individuals through sports, arts, technology, and community service.',
    cta: 'View Campus Life',
    bg: 'from-[#0d1757] via-[#1a237e] to-[#1565c0]',
    stat: { value: '2000+', label: 'Alumni Network' },
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
        />
      </AnimatePresence>

      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl opacity-15" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400 rounded-full blur-3xl opacity-10" />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 rounded-full px-4 py-1.5 text-gold-300 text-sm font-medium mb-6"
            >
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              Admissions Open 2024–25
            </motion.div>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-display leading-[1.05] mb-3">
                  {slide.title}
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display leading-[1.05] mb-6"
                  style={{ background: 'linear-gradient(135deg, #fdd835, #f9a825)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {slide.highlight}
                </h1>
                <p className="text-lg text-navy-200 max-w-xl mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="#contact"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-7 py-4 rounded-xl transition-all active:scale-95 shadow-lg text-sm"
              >
                {slide.cta} <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/login"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-xl border border-white/20 transition-all text-sm"
              >
                Student Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-12">
              {[
                { icon: BookOpen, val: '40+', label: 'Subjects' },
                { icon: Users, val: '150+', label: 'Faculty' },
                { icon: Award, val: slide.stat.value, label: slide.stat.label },
              ].map(({ icon: Icon, val, label }) => (
                <div key={label} className="text-center">
                  <Icon className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gold-400 font-display">{val}</div>
                  <div className="text-xs text-navy-300 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature cards float */}
          <div className="hidden lg:flex flex-col gap-4">
            {[
              { icon: '🏆', title: 'Academic Excellence', desc: 'Top-ranked in regional boards for 10 consecutive years' },
              { icon: '💻', title: 'Smart Classrooms', desc: 'Technology-integrated learning with 1:1 device ratio' },
              { icon: '🌏', title: 'Global Exposure', desc: 'International exchange programs with 15+ countries' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="glass rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="text-3xl">{card.icon}</div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                  <p className="text-navy-300 text-xs mt-0.5">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <button onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${i === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/40'}`} />
          ))}
        </div>
        <button onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
