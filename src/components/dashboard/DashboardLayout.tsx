import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutDashboard, Users, BookOpen, Calendar, Settings, Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Example generic nav links based on role (would be more robust in reality)
  const navLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    ...(user?.role === 'admin' ? [{ icon: Users, label: 'Manage Users', href: '/dashboard?view=manage-users' }] : []),
    ...(user?.role === 'teacher' ? [{ icon: BookOpen, label: 'My Classes', href: '/dashboard?tab=classes' }] : []),
    ...(user?.role === 'student' ? [{ icon: Calendar, label: 'My Timetable', href: '/dashboard' }] : []),
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  return (
    <motion.div layoutId="portal-card" className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.4 }}
            className="bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col flex-shrink-0 z-20 overflow-hidden"
          >
            {/* Sidebar Header */}
            <div className="h-20 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
              <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-navy-900" />
              </div>
              <div>
                <h1 className="font-bold text-navy-900 text-lg leading-tight font-display">EPS Portal</h1>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-1">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href || (location.pathname + location.search) === link.href;
                
                return (
                  <motion.a
                    key={i}
                    href={link.href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'bg-navy-800 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-navy-900'
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className="w-5 h-5 transition-colors group-hover:text-gold-500" />
                    </motion.div>
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-xl font-bold text-navy-900 font-display hidden sm:block">Dashboard</h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-navy-900 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-navy-900 leading-tight">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-navy-100 border-2 border-white shadow-sm flex items-center justify-center text-navy-800 font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 relative">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname + user?.role}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default DashboardLayout;
