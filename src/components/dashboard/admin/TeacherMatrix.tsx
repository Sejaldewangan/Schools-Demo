import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Check, ShieldCheck, BookOpen, Layers } from 'lucide-react';

interface TeacherMatrixProps {
  onClose: () => void;
}

const TeacherMatrix: React.FC<TeacherMatrixProps> = ({ onClose }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  
  const teachers = [
    { id: 't1', name: 'Dr. Robert Fox', email: 'robert@eps.school', subjects: ['Math', 'Physics'], isClassTeacher: true, class: '10-A' },
    { id: 't2', name: 'Prof. Jane Cooper', email: 'jane@eps.school', subjects: ['Chemistry'], isClassTeacher: false, class: null },
    { id: 't3', name: 'Mr. Guy Hawkins', email: 'guy@eps.school', subjects: ['English', 'History'], isClassTeacher: false, class: null },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-navy-900">Teacher Assignment Matrix</h3>
            <p className="text-sm text-gray-500">Configure roles, assigned classes, and subject specializations.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-3 h-[500px]">
          {/* Teacher List */}
          <div className="col-span-1 border-r border-gray-100 overflow-y-auto">
            <div className="p-4 border-b border-gray-50 sticky top-0 bg-white z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Filter teachers..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-navy-500/10" />
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {teachers.map(teacher => (
                <button 
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                    selectedTeacher === teacher.id ? 'bg-navy-50 border-l-4 border-navy-900' : 'border-l-4 border-transparent'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy-900 font-bold shadow-sm">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{teacher.name}</p>
                    <p className="text-xs text-gray-500">{teacher.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="col-span-2 p-8 overflow-y-auto">
            {selectedTeacher ? (
              <motion.div 
                key={selectedTeacher}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-navy-900">Assignment Details</h4>
                  <span className="badge badge-gold">Faculty Member</span>
                </div>

                <div className="space-y-6">
                  {/* Role Config */}
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <ShieldCheck className="w-5 h-5 text-navy-900" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-navy-900">Class Teacher Status</p>
                          <p className="text-xs text-gray-500">Enable administrative rights for a specific class.</p>
                        </div>
                      </div>
                      <div className="flex items-center h-6">
                        <input type="checkbox" className="w-4 h-4 text-navy-600 border-gray-300 rounded focus:ring-navy-500" />
                      </div>
                    </div>
                    <div className="pl-11">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Assign Class</label>
                      <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy-500/10">
                        <option>Select Class</option>
                        <option>10-A</option>
                        <option>10-B</option>
                        <option>11-C</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject Config */}
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <BookOpen className="w-5 h-5 text-navy-900" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy-900">Subject Specializations</p>
                        <p className="text-xs text-gray-500">Subjects this teacher is eligible to teach.</p>
                      </div>
                    </div>
                    <div className="pl-11 grid grid-cols-2 gap-3">
                      {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'].map(sub => (
                        <label key={sub} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-navy-200 cursor-pointer transition-all">
                          <input type="checkbox" className="w-4 h-4 text-navy-600 border-gray-300 rounded" />
                          <span className="text-sm font-medium text-gray-700">{sub}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button className="bg-navy-900 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-navy-800 transition-all shadow-lg shadow-navy-100">
                    Save Assignments
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                  <Layers className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-navy-900 font-bold">No Teacher Selected</p>
                  <p className="text-sm text-gray-500 max-w-xs">Select a teacher from the left sidebar to start configuring their class and subject assignments.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherMatrix;
