import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Calendar as CalendarIcon, Clock, BookOpen } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [1, 2, 3, 4, 5, 6, 7];

const TimetableBuilder = () => {
  const [timetable, setTimetable] = useState<Record<string, any>>({
    'Monday-1': { subject: 'Mathematics', class: '10-A', room: 'B1' },
    'Tuesday-2': { subject: 'Physics', class: '10-B', room: 'Lab 1' },
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-navy-900">Weekly Schedule</h3>
          <p className="text-sm text-gray-500">Academic Session 2024-25</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            isEditing 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
            : 'bg-navy-900 text-white shadow-lg shadow-navy-100'
          }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Schedule'}
        </button>
      </div>

      <div className="card overflow-x-auto p-0 border-none shadow-2xl shadow-gray-100/50">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-8 bg-gray-50/50 border-b border-gray-100">
            <div className="p-4 flex items-center justify-center border-r border-gray-100">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            {days.map(day => (
              <div key={day} className="p-4 text-center font-black text-xs text-navy-900 uppercase tracking-widest border-r border-gray-100 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Period Rows */}
          {periods.map(p => (
            <div key={p} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0">
              <div className="p-4 flex flex-col items-center justify-center bg-gray-50/30 border-r border-gray-100">
                <span className="text-sm font-black text-navy-900">P{p}</span>
                <span className="text-[10px] text-gray-400 font-bold">08:00 AM</span>
              </div>
              {days.map(day => {
                const key = `${day}-${p}`;
                const entry = timetable[key];
                return (
                  <div key={day} className="p-3 border-r border-gray-100 last:border-r-0 min-h-[100px] relative group transition-all hover:bg-navy-50/30">
                    {entry ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full p-3 rounded-xl bg-white border border-navy-100 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <p className="text-xs font-black text-navy-900 leading-tight">{entry.subject}</p>
                          <p className="text-[10px] text-gray-500 font-bold mt-1">Class {entry.class}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase">{entry.room}</span>
                          {isEditing && (
                            <button 
                              onClick={() => {
                                const newTimetable = { ...timetable };
                                delete newTimetable[key];
                                setTimetable(newTimetable);
                              }}
                              className="p-1.5 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      isEditing && (
                        <button className="w-full h-full border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300 hover:border-navy-200 hover:text-navy-300 hover:bg-white transition-all">
                          <Plus className="w-6 h-6" />
                        </button>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetableBuilder;
