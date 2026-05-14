import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

const EVENTS: Record<string, { date: number; title: string; type: string }[]> = {
  '2024-01': [
    { date: 5, title: 'New Year Assembly', type: 'assembly' },
    { date: 10, title: 'Mid-term Exams Begin', type: 'exam' },
    { date: 20, title: 'Republic Day Celebration', type: 'cultural' },
    { date: 26, title: 'Annual Sports Meet', type: 'sports' },
  ],
  '2024-02': [
    { date: 3, title: 'Science Fair', type: 'academic' },
    { date: 14, title: 'Art & Culture Week', type: 'cultural' },
    { date: 22, title: 'Parent-Teacher Meet', type: 'meeting' },
    { date: 28, title: 'Board Exam Prep', type: 'exam' },
  ],
  '2024-03': [
    { date: 8, title: "Women's Day Celebration", type: 'cultural' },
    { date: 15, title: 'Annual Day', type: 'cultural' },
    { date: 20, title: 'Final Term Exams', type: 'exam' },
    { date: 29, title: 'Results Declaration', type: 'academic' },
  ],
};

const TYPE_COLORS: Record<string, string> = {
  exam:     'bg-red-100 text-red-700',
  cultural: 'bg-purple-100 text-purple-700',
  sports:   'bg-emerald-100 text-emerald-700',
  academic: 'bg-blue-100 text-blue-700',
  assembly: 'bg-gold-100 text-gold-700',
  meeting:  'bg-gray-100 text-gray-700',
};

const MONTHS = ['January 2024', 'February 2024', 'March 2024'];
const MONTH_KEYS = ['2024-01', '2024-02', '2024-03'];

const AcademicCalendar = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const changeMonth = (newIdx: number) => {
    setDirection(newIdx > currentIdx ? 1 : -1);
    setCurrentIdx(newIdx);
    setSelectedDate(null);
  };

  const events = EVENTS[MONTH_KEYS[currentIdx]] || [];

  return (
    <section id="calendar" className="py-24 bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">Stay Updated</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mt-2">Academic Calendar</h2>
          <p className="text-navy-300 mt-3 max-w-xl mx-auto text-sm">
            Stay ahead with our school's key events, examinations, and celebrations throughout the year.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Month Navigator */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => changeMonth(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-30 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="text-white font-bold font-display">{MONTHS[currentIdx]}</h3>
                <button
                  onClick={() => changeMonth(Math.min(MONTHS.length - 1, currentIdx + 1))}
                  disabled={currentIdx === MONTHS.length - 1}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mini calendar grid with Carousel transition */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIdx}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-7 gap-1 text-center"
                >
                  {['S','M','T','W','T','F','S'].map((d, i) => (
                    <div key={i} className="text-navy-400 text-xs py-1 font-medium">{d}</div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const hasEvent = events.some(e => e.date === day);
                    const isSelected = selectedDate === day;
                    return (
                      <motion.button
                        key={day}
                        onClick={() => hasEvent && setSelectedDate(isSelected ? null : day)}
                        animate={isSelected ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] } : {}}
                        transition={isSelected ? { duration: 0.5, ease: "easeInOut" } : {}}
                        className={`text-xs py-1.5 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-gold-400 text-navy-900 font-bold shadow-[0_0_15px_rgba(253,216,53,0.5)]'
                            : hasEvent
                              ? 'bg-gold-500/80 text-navy-900 font-bold hover:bg-gold-400 cursor-pointer'
                              : 'text-navy-300 hover:bg-white/10 cursor-default'
                        }`}
                      >
                        {day}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(TYPE_COLORS).slice(0, 4).map(([type, cls]) => (
                  <span key={type} className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Events List with Carousel transition */}
          <div className="lg:col-span-2 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIdx}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {events.map((event, i) => {
                  const isSelected = selectedDate === event.date;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedDate(isSelected ? null : event.date)}
                      className={`glass rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-gold-400 scale-[1.02] bg-white/15' : 'hover:bg-white/15 hover:scale-[1.01]'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-gold-400' : 'bg-gold-500'}`}>
                        <span className="text-lg font-black text-navy-900 font-display leading-none">{event.date}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm">{event.title}</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <CalendarDays className="w-3 h-3 text-navy-400" />
                          <span className="text-navy-400 text-xs">{MONTHS[currentIdx]}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium flex-shrink-0 ${TYPE_COLORS[event.type]}`}>
                        {event.type}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicCalendar;
