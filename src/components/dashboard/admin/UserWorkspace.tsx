import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Search, Filter, MoreVertical, ShieldCheck, GraduationCap } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/Tabs';
import AdmissionForm from './AdmissionForm';
import TeacherMatrix from './TeacherMatrix';

const UserWorkspace = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showMatrixModal, setShowMatrixModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-900 font-display">Manage Users</h2>
          <p className="text-gray-500 text-sm">Directory of students, teachers and staff members.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAdmissionModal(true)}
            className="flex items-center gap-2 bg-navy-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-navy-800 transition-all shadow-lg shadow-navy-100"
          >
            <UserPlus className="w-4 h-4" />
            Add Admissions
          </button>
          <button 
            onClick={() => setShowMatrixModal(true)}
            className="flex items-center gap-2 bg-gold-500 text-navy-900 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gold-600 transition-all shadow-lg shadow-gold-100"
          >
            <ShieldCheck className="w-4 h-4" />
            Teacher Matrix
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <Tabs defaultValue="students" onValueChange={setActiveTab} className="w-full">
          <div className="px-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <TabsList className="bg-transparent border-none gap-8 h-14">
              <TabsTrigger value="students" className="data-[state=active]:bg-transparent data-[state=active]:text-navy-900 data-[state=active]:border-b-2 data-[state=active]:border-navy-900 rounded-none px-0 text-sm font-bold">
                Students
              </TabsTrigger>
              <TabsTrigger value="teachers" className="data-[state=active]:bg-transparent data-[state=active]:text-navy-900 data-[state=active]:border-b-2 data-[state=active]:border-navy-900 rounded-none px-0 text-sm font-bold">
                Teachers
              </TabsTrigger>
              <TabsTrigger value="staff" className="data-[state=active]:bg-transparent data-[state=active]:text-navy-900 data-[state=active]:border-b-2 data-[state=active]:border-navy-900 rounded-none px-0 text-sm font-bold">
                Staff
              </TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500/10 transition-all w-64"
                />
              </div>
              <button className="p-2 text-gray-500 hover:bg-white hover:text-navy-900 rounded-lg border border-transparent hover:border-gray-200 transition-all">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="students" className="p-0 mt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <UserTable role="student" />
              </motion.div>
            </TabsContent>
            <TabsContent value="teachers" className="p-0 mt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <UserTable role="teacher" />
              </motion.div>
            </TabsContent>
            <TabsContent value="staff" className="p-0 mt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <UserTable role="staff" />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Admission Modal */}
      {showAdmissionModal && (
        <AdmissionForm onClose={() => setShowAdmissionModal(false)} />
      )}

      {/* Matrix Modal */}
      {showMatrixModal && (
        <TeacherMatrix onClose={() => setShowMatrixModal(false)} />
      )}
    </div>
  );
};

const UserTable = ({ role }: { role: string }) => {
  // Mock data for display
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active', class: '10-A', roll: 'R001' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Active', class: '10-B', roll: 'R002' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', status: 'Inactive', class: '9-A', roll: 'R045' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Role/Class</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Joined Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/30 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center text-navy-800 font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-navy-900">{role === 'student' ? user.class : 'Faculty'}</span>
                  {role === 'student' && <span className="text-xs text-gray-400">Roll: {user.roll}</span>}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">12 May, 2024</td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserWorkspace;
