import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock, Users, ChevronLeft, Save } from 'lucide-react';
import { teacherAPI } from '../../../services/api';

interface Student {
  _id: string;
  userId: { name: string; email: string };
  rollNumber: string;
}

const AttendanceSystem = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [loading, setLoading] = useState(false);

  // Mock classes for selection
  const classes = [
    { id: '1', name: 'Grade 10-A', subject: 'Mathematics' },
    { id: '2', name: 'Grade 10-B', subject: 'Physics' },
  ];

  const fetchStudents = async (classId: string) => {
    setLoading(true);
    // In real app, call API
    setTimeout(() => {
      setStudents([
        { _id: 's1', userId: { name: 'Alice Smith', email: 'alice@eps.school' }, rollNumber: 'R101' },
        { _id: 's2', userId: { name: 'Bob Wilson', email: 'bob@eps.school' }, rollNumber: 'R102' },
        { _id: 's3', userId: { name: 'Charlie Brown', email: 'charlie@eps.school' }, rollNumber: 'R103' },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleMark = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const bulkMark = (status: 'present' | 'absent' | 'late') => {
    const newAttendance = { ...attendance };
    students.forEach(s => newAttendance[s._id] = status);
    setAttendance(newAttendance);
  };

  if (!selectedClass) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {classes.map(cls => (
          <button 
            key={cls.id}
            onClick={() => { setSelectedClass(cls.id); fetchStudents(cls.id); }}
            className="card p-8 hover:border-navy-900 transition-all text-left group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-all">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Class</span>
            </div>
            <h3 className="text-xl font-bold text-navy-900">{cls.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{cls.subject}</p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedClass(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h3 className="text-xl font-bold text-navy-900">Mark Attendance</h3>
            <p className="text-sm text-gray-500">Class 10-A • {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => bulkMark('present')}
            className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-all"
          >
            Bulk Mark Present
          </button>
          <button className="flex items-center gap-2 bg-navy-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-navy-800 transition-all shadow-lg shadow-navy-100">
            <Save className="w-4 h-4" />
            Submit Records
          </button>
        </div>
      </div>

      <div className="card overflow-hidden border-none shadow-xl shadow-gray-100/50">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest">
              <th className="px-8 py-5">Roll No.</th>
              <th className="px-8 py-5">Student Name</th>
              <th className="px-8 py-5 text-center">Attendance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5 font-mono text-sm text-navy-900 font-bold">{student.rollNumber}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                      {student.userId.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-900">{student.userId.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{student.userId.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => handleMark(student._id, 'present')}
                      className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
                        attendance[student._id] === 'present' 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 ring-4 ring-emerald-100' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase mt-1">P</span>
                    </button>
                    <button 
                      onClick={() => handleMark(student._id, 'late')}
                      className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
                        attendance[student._id] === 'late' 
                        ? 'bg-amber-400 text-white shadow-lg shadow-amber-200 ring-4 ring-amber-100' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase mt-1">L</span>
                    </button>
                    <button 
                      onClick={() => handleMark(student._id, 'absent')}
                      className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
                        attendance[student._id] === 'absent' 
                        ? 'bg-red-500 text-white shadow-lg shadow-red-200 ring-4 ring-red-100' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <X className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase mt-1">A</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSystem;
