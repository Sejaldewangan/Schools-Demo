import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { teacherAPI } from '../../services/api';
import { BookOpen, CheckCircle, FileText, Clock } from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'classes' | 'attendance' | 'grades'>('classes');

  const { data: classesData, isLoading } = useQuery({
    queryKey: ['teacherClasses', user?.id],
    queryFn: async () => {
      const res = await teacherAPI.getClasses(user!.id);
      return res.data.data;
    },
    enabled: !!user,
  });

  const stats = [
    { label: 'Assigned Classes', val: classesData?.length || 0, icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
    { label: 'Attendance Marked', val: 'Today', icon: CheckCircle, color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Pending Grades', val: '5', icon: FileText, color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 font-display">Welcome, {user?.name}</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your classes, attendance, and grades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{s.label}</p>
              <p className="text-xl font-bold text-navy-900">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {(['classes', 'attendance', 'grades'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-semibold capitalize transition-all ${
                activeTab === tab 
                  ? 'text-navy-900 border-b-2 border-gold-500 bg-gray-50/50' 
                  : 'text-gray-500 hover:text-navy-700 hover:bg-gray-50/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="p-6 min-h-[300px]">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-100 rounded-xl" />
              <div className="h-12 bg-gray-100 rounded-xl" />
            </div>
          ) : (
            <>
              {activeTab === 'classes' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {classesData?.length === 0 ? (
                    <p className="text-gray-500 col-span-2 text-center py-8">No classes assigned.</p>
                  ) : (
                    classesData?.map((cls: any) => (
                      <div key={cls._id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-navy-900 text-lg">Class {cls.grade} - {cls.section}</h3>
                            <p className="text-sm text-gray-500">{cls.name}</p>
                          </div>
                          <span className="badge badge-blue">{cls.academicYear}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          Capacity: {cls.capacity} students
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              {activeTab === 'attendance' && (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-navy-900 font-bold">Mark Attendance</h3>
                  <p className="text-gray-500 text-sm mt-1 mb-4">Select a class to mark attendance for today.</p>
                  <button className="btn-primary">Select Class</button>
                </div>
              )}
              {activeTab === 'grades' && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-navy-900 font-bold">Grade Entry</h3>
                  <p className="text-gray-500 text-sm mt-1 mb-4">Upload or enter grades for your subjects.</p>
                  <button className="btn-primary">Enter Grades</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Placeholder icon that wasn't imported above to avoid errors
const Users = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

export default TeacherDashboard;
