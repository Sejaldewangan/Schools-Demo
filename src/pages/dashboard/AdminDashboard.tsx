import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminAPI } from '../../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, IndianRupee, TrendingUp, UserCheck, Search, Bell, LayoutDashboard, UserCog, Mail, Calendar as CalendarIcon } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import UserWorkspace from '../../components/dashboard/admin/UserWorkspace';

import { useSearchParams } from 'react-router-dom';

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = (searchParams.get('view') || 'overview') as 'overview' | 'manage-users' | 'notices' | 'engagements';
  
  const setCurrentView = (view: string) => {
    setSearchParams({ view });
  };

  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await adminAPI.getStats();
      return res.data.data;
    },
  });

  if (isLoading) return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
      </div>
    </div>
  );

  const { overview, revenue, enrollment, recentStudents } = data;

  const kpis = [
    { title: 'Total Students', value: overview.totalStudents, icon: Users, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
    { title: 'Total Teachers', value: overview.totalTeachers, icon: UserCheck, color: 'bg-emerald-50 text-emerald-600', trend: '+2%' },
    { title: 'Revenue Collected', value: `₹${(revenue.totalCollected / 100000).toFixed(2)}L`, icon: IndianRupee, color: 'bg-gold-50 text-gold-600', trend: '+15%' },
    { title: 'Attendance Rate', value: '94%', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', trend: '+1%' },
  ];

  return (
    <div className="space-y-8">
      {/* Dynamic Breadcrumbs / Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <button 
          onClick={() => setCurrentView('overview')}
          className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
            currentView === 'overview' ? 'bg-navy-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => setCurrentView('manage-users')}
          className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
            currentView === 'manage-users' ? 'bg-navy-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Manage Users
        </button>
        <button 
          className={`px-3 py-1.5 rounded-lg transition-all font-medium text-gray-500 hover:bg-gray-100`}
        >
          Notices
        </button>
        <button 
          className={`px-3 py-1.5 rounded-lg transition-all font-medium text-gray-500 hover:bg-gray-100`}
        >
          Engagements
        </button>
      </div>

      <AnimatePresence mode="wait">
        {currentView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-6"
          >
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black text-navy-900 font-display tracking-tight">Executive Dashboard</h2>
                <p className="text-gray-500 text-sm mt-1">Institutional performance at a glance.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Global student search..." 
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-navy-500/5 transition-all w-72"
                  />
                </div>
                <button className="btn-primary shadow-xl shadow-navy-100">Download Report</button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-6 group hover:border-navy-200 transition-all cursor-default"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${kpi.color} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                      <kpi.icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg tracking-wider">{kpi.trend}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">vs last month</span>
                    </div>
                  </div>
                  <h3 className="text-gray-500 text-sm font-bold tracking-wide uppercase">{kpi.title}</h3>
                  <p className="text-3xl font-black text-navy-900 mt-2 tracking-tight">{kpi.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="card lg:col-span-2 p-8">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 font-display">Student Enrollment</h3>
                    <p className="text-sm text-gray-400">Total registrations per month</p>
                  </div>
                  <select className="bg-gray-50 border-none text-xs font-bold px-3 py-1.5 rounded-lg focus:ring-0">
                    <option>Last 6 Months</option>
                    <option>Academic Year</option>
                  </select>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={enrollment}>
                      <defs>
                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={15} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(15,23,42,0.1)', padding: '12px' }}
                        itemStyle={{ fontWeight: 800, color: '#0f172a' }}
                      />
                      <Area type="monotone" dataKey="students" stroke="#0f172a" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" isAnimationActive={true} animationDuration={1500} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card p-8 flex flex-col bg-navy-900 text-white border-none shadow-2xl shadow-navy-200">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold font-display">Recent Admissions</h3>
                  <button className="text-xs font-bold text-gold-400 hover:text-gold-300">View All</button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                  {recentStudents?.map((s: any, i: number) => (
                    <motion.div 
                      key={s._id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-gold-500 border border-white/5 group-hover:bg-gold-500 group-hover:text-navy-900 transition-all duration-300">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-gold-400 transition-colors">{s.name}</p>
                          <p className="text-xs text-navy-300 font-medium">{new Date(s.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                        </div>
                      </div>
                      <span className="w-2 h-2 bg-gold-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-sm font-bold transition-all border border-white/5">
                    Generate Batch Report
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'manage-users' && (
          <motion.div
            key="manage-users"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <UserWorkspace />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
