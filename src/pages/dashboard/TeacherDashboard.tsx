import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { teacherAPI } from '../../services/api';
import { BookOpen, CheckCircle, FileText, Clock, Users, Calendar, Search, ShieldAlert } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import AttendanceSystem from '../../components/dashboard/teacher/AttendanceSystem';
import TimetableBuilder from '../../components/dashboard/teacher/TimetableBuilder';
import ClassStudentSearch from '../../components/dashboard/teacher/ClassStudentSearch';

import { useSearchParams } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') || 'classes') as 'classes' | 'attendance' | 'timetable' | 'my-class';

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const { data: classesData, isLoading } = useQuery({
    queryKey: ['teacherClasses', user?.id],
    queryFn: async () => {
      const res = await teacherAPI.getClasses(user!.id);
      return res.data.data;
    },
    enabled: !!user,
  });

  // Check if user is a class teacher (from extended schema)
  const isClassTeacher = (user as any)?.isClassTeacher || true; // Mocked for demo

  const stats = [
    { label: 'Assigned Classes', val: classesData?.length || 2, icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
    { label: 'Attendance Marked', val: 'Today', icon: CheckCircle, color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Upcoming Period', val: '10:00 AM', icon: Clock, color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-navy-900 font-display tracking-tight">Academic Portal</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">Manage your instructional duties and students.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="pr-4">
            <p className="text-sm font-bold text-navy-900 leading-tight">{user?.name}</p>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{user?.role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          [1,2,3].map(i => <Skeleton key={i} className="h-28 w-full rounded-3xl" />)
        ) : (
          stats.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-6 flex items-center gap-5 group hover:border-navy-200 transition-all"
            >
              <div className={`p-4 rounded-2xl ${s.color} group-hover:scale-110 transition-transform`}>
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-navy-900 mt-1 tracking-tight">{s.val}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="card p-0 overflow-hidden border-none shadow-2xl shadow-gray-100/50">
        <div className="flex bg-gray-50/50 p-2 gap-2">
          {(['classes', 'attendance', 'timetable', 'my-class'] as const).map(tab => {
            if (tab === 'my-class' && !isClassTeacher) return null;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-navy-900 shadow-sm border border-gray-100' 
                    : 'text-gray-500 hover:text-navy-700 hover:bg-white/50'
                }`}
              >
                <span className="capitalize">{tab === 'my-class' ? 'My Class Students' : tab}</span>
              </button>
            );
          })}
        </div>
        
        <div className="p-8 min-h-[400px] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'classes' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(classesData || [
                    { _id: '1', grade: '10', section: 'A', name: 'Mathematics', academicYear: '2024-25', capacity: 30 },
                    { _id: '2', grade: '10', section: 'B', name: 'Physics', academicYear: '2024-25', capacity: 30 }
                  ])?.map((cls: any) => (
                    <div key={cls._id} className="border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:shadow-gray-100 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center text-navy-900 font-bold group-hover:bg-navy-900 group-hover:text-white transition-all">
                          {cls.grade}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gold-600 bg-gold-50 px-2.5 py-1 rounded-lg">{cls.section}</span>
                      </div>
                      <h3 className="font-black text-navy-900 text-xl tracking-tight mb-2">{cls.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                          <Users className="w-4 h-4" />
                          {cls.capacity} Students Enrolled
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                          <Calendar className="w-4 h-4" />
                          Academic Year {cls.academicYear}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'attendance' && <AttendanceSystem />}
              
              {activeTab === 'timetable' && <TimetableBuilder />}
              
              {activeTab === 'my-class' && <ClassStudentSearch />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

