import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Trophy, Globe, Microscope, Music, Shield } from 'lucide-react';

const CARDS = [
  { icon: BookOpen,   color: 'bg-blue-50 text-blue-600',     shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]', title: 'Academic Excellence',    desc: 'Rigorous curriculum aligned with national and international standards to prepare students for the best universities.' },
  { icon: Trophy,     color: 'bg-gold-50 text-gold-700',     shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(249,168,37,0.3)]', title: 'Award-Winning Faculty',  desc: 'Over 150 dedicated educators with advanced degrees and a passion for inspiring the next generation of leaders.' },
  { icon: Globe,      color: 'bg-emerald-50 text-emerald-600', shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(5,150,105,0.3)]', title: 'Global Perspective', desc: 'International exchange programs, MUN conferences and partnerships with schools across 15 countries.' },
  { icon: Microscope, color: 'bg-purple-50 text-purple-600', shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.3)]', title: 'Research & Innovation', desc: 'State-of-the-art science labs, maker spaces, and a STEM curriculum that fosters curiosity and problem-solving.' },
  { icon: Music,      color: 'bg-pink-50 text-pink-600',     shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(219,39,119,0.3)]', title: 'Arts & Culture',         desc: 'A vibrant arts program encompassing music, dance, drama, and visual arts to nurture creativity and expression.' },
  { icon: Shield,     color: 'bg-navy-50 text-navy-700',     shadow: 'hover:shadow-[0_20px_40px_-15px_rgba(26,35,126,0.3)]', title: 'Safe Environment',       desc: 'A secure, inclusive, and nurturing campus where every student feels valued, protected, and ready to thrive.' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-navy-600 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Why EPS School
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            A Legacy of Excellence,<br />A Vision for the Future
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            For over 25 years, EPS School has been the cornerstone of quality education — blending tradition with innovation to create tomorrow's global citizens.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} variants={cardVariant}>
                <div className={`card h-full transition-all duration-500 hover:-translate-y-2 group cursor-pointer border hover:border-transparent ${card.shadow}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <motion.div
                      animate={{ opacity: [1, 0.7, 1], scale: [1, 0.95, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-bold text-navy-800 mb-2 font-display transition-colors group-hover:text-navy-900">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed transition-colors group-hover:text-gray-700">{card.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { value: '2,500+', label: 'Students Enrolled' },
            { value: '98%',    label: 'Board Pass Rate' },
            { value: '150+',   label: 'Expert Faculty' },
            { value: '25+',    label: 'Years of Excellence' },
          ].map((stat) => (
            <div key={stat.label} className="text-center card">
              <div className="text-3xl font-black text-navy-800 font-display">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
