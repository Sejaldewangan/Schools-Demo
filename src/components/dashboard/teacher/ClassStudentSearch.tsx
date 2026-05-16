import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, GraduationCap, Phone, MapPin, MoreHorizontal } from 'lucide-react';

const ClassStudentSearch = () => {
  const [query, setQuery] = useState('');
  
  // Mock students in the teacher's assigned class
  const students = [
    { id: 's1', name: 'Alice Smith', roll: 'R101', email: 'alice@eps.school', parent: 'John Smith', phone: '+91 98765 43210' },
    { id: 's2', name: 'Bob Wilson', roll: 'R102', email: 'bob@eps.school', parent: 'Sarah Wilson', phone: '+91 98765 43211' },
    { id: 's3', name: 'Charlie Brown', roll: 'R103', email: 'charlie@eps.school', parent: 'Lucy Brown', phone: '+91 98765 43212' },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.roll.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-6 bg-navy-900 rounded-3xl text-white shadow-2xl shadow-navy-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/10">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <h3 className="text-xl font-bold font-display">Class Administration</h3>
          </div>
          <p className="text-navy-200 text-sm max-w-lg">
            You are the Class Teacher for **Grade 10-A**. You have restricted access to the profiles and emergency contacts of the students listed below.
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or roll number..." 
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-navy-500/5 transition-all text-sm font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStudents.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="card p-6 group hover:border-navy-200 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-navy-900 font-black text-xl group-hover:bg-navy-900 group-hover:text-white transition-all duration-300">
                  {student.name.charAt(0)}
                </div>
                <button className="p-2 text-gray-300 hover:text-navy-900 hover:bg-gray-50 rounded-xl transition-all">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-navy-900">{student.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gold-600 bg-gold-50 px-2 py-0.5 rounded">Roll: {student.roll}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Active</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 font-medium">{student.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 font-medium">Guardian: {student.parent}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClassStudentSearch;
